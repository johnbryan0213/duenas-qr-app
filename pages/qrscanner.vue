<template>
  <v-container>
    <!-- Scanner Interface -->
    <v-btn
      color="primary"
      @click="toggleScanner"
      :loading="loading"
      block
      large
    >
      <v-icon left>mdi-camera</v-icon>
      {{ isScanning ? 'Stop Scanner' : 'Start Scanner' }}
    </v-btn>

    <!-- Scanner Container - MUST use this exact ID -->
    <div id="qr-reader" style="width:100%;min-height:300px;"></div>

    <!-- Visual Feedback -->
    <v-alert v-if="status" :type="alertType" class="mt-4">
      {{ status }}
      <v-btn v-if="showRetry" small @click="initScanner" class="ml-2">
        Retry
      </v-btn>
    </v-alert>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    html5QrCode: null,
    isScanning: false,
    loading: false,
    status: '',
    alertType: 'info',
    showRetry: false
  }),

  async mounted() {
    // Preload scanner library
    await this.loadLibrary();
  },

  beforeDestroy() {
    this.cleanupScanner();
  },

  methods: {
    async loadLibrary() {
      try {
        // Load only the necessary components
        const { Html5Qrcode } = await import('html5-qrcode');
        window.Html5Qrcode = Html5Qrcode; // Make globally available
      } catch (err) {
        this.setStatus('Failed to load scanner library', 'error', true);
      }
    },

    async toggleScanner() {
      this.isScanning ? this.stopScanner() : await this.initScanner();
    },

    async initScanner() {
      this.loading = true;
      this.setStatus('Initializing...', 'info');

      try {
        // 1. Verify camera access
        await this.testCameraAccess();
        
        // 2. Initialize scanner
        this.html5QrCode = new window.Html5Qrcode("qr-reader");
        
        // 3. Start scanning
        await this.html5QrCode.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          this.handleScan,
          () => {} // Quiet error handling
        );

        this.isScanning = true;
        this.setStatus('Scanner ready - point at QR code', 'success');
      } catch (err) {
        this.handleError(err);
      } finally {
        this.loading = false;
      }
    },

    async testCameraAccess() {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      // Immediately release
      stream.getTracks().forEach(track => track.stop());
    },

    handleScan(decodedText) {
      this.setStatus(`Scanned: ${decodedText}`, 'success');
      this.$emit('scanned', decodedText);
    },

    handleError(err) {
      console.error('Scanner error:', err);
      let message = 'Scanner error';
      
      if (err.name === 'NotAllowedError') {
        message = 'Camera access denied. Please check permissions.';
      } else if (err.name === 'NotFoundError') {
        message = 'No camera detected';
      } else if (err.message.includes('Requested device not found')) {
        message = 'Camera not found. Try another device.';
      } else {
        message = err.message || 'Unknown scanner error';
      }

      this.setStatus(message, 'error', true);
      this.cleanupScanner();
    },

    setStatus(text, type, showRetry = false) {
      this.status = text;
      this.alertType = type;
      this.showRetry = showRetry;
    },

    async stopScanner() {
      if (this.html5QrCode) {
        try {
          await this.html5QrCode.stop();
          this.setStatus('Scanner stopped', 'info');
        } catch (err) {
          console.warn('Stop error:', err);
        }
      }
      this.cleanupScanner();
    },

    cleanupScanner() {
      this.isScanning = false;
      this.html5QrCode = null;
      // Clear the container
      document.getElementById('qr-reader').innerHTML = '';
    }
  }
};
</script>