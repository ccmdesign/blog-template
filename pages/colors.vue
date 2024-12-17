<template>
  <main>
    <blog-section>
      <div class="swatches">
        <div class="swatch background-color:base-color-900">Base 900</div>
        <div class="swatch background-color:base-color-800">Base 800</div>
        <div class="swatch background-color:base-color-700">Base 700</div>
        <div class="swatch background-color:base-color-600">Base 600</div>
        <div class="swatch background-color:base-color-500">Base 500</div>
        <div class="swatch background-color:base-color-400">Base 400</div>
        <div class="swatch background-color:base-color-300">Base 300</div>
        <div class="swatch background-color:base-color-200">Base 200</div>
        <div class="swatch background-color:base-color-100">Base 100</div>
        <div class="swatch background-color:base-color-50">Base 50</div>
      </div>

      <div class="swatches">
        <div class="swatch background-color:primary-color-900">Primary 900</div>
        <div class="swatch background-color:primary-color-800">Primary 800</div>
        <div class="swatch background-color:primary-color-700">Primary 700</div>
        <div class="swatch background-color:primary-color-600">Primary 600</div>
        <div class="swatch background-color:primary-color-500">Primary 500</div>
        <div class="swatch background-color:primary-color-400">Primary 400</div>
        <div class="swatch background-color:primary-color-300">Primary 300</div>
        <div class="swatch background-color:primary-color-200">Primary 200</div>
        <div class="swatch background-color:primary-color-100">Primary 100</div>
        <div class="swatch background-color:primary-color-50">Primary 50</div>
      </div>
      
      <div class="swatches">
        <div class="swatch background-color:accent-color-900">Accent 900</div>
        <div class="swatch background-color:accent-color-800">Accent 800</div>
        <div class="swatch background-color:accent-color-700">Accent 700</div>
        <div class="swatch background-color:accent-color-600">Accent 600</div>
        <div class="swatch background-color:accent-color-500">Accent 500</div>
        <div class="swatch background-color:accent-color-400">Accent 400</div>
        <div class="swatch background-color:accent-color-300">Accent 300</div>
        <div class="swatch background-color:accent-color-200">Accent 200</div>
        <div class="swatch background-color:accent-color-100">Accent 100</div>
        <div class="swatch background-color:accent-color-50">Accent 50</div>
      </div>
    </blog-section>
  </main>
</template>

<script setup></script>

<style scoped lang="scss">
.swatches {
  display: flex;
}

.swatch {
  aspect-ratio: 1;
  width: 120px;
}

</style>
