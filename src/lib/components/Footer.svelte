<script lang="ts">
  import type { SiteSettings } from "$lib/content";

  export let settings: SiteSettings;
</script>

<footer>
  <div class="footer row">
    <div class="col three-to-six padding">
      <small
        >© 2024 – 2014 • <a href="/">{settings.name}</a> — Scénographe et
        Costumière</small
      >
    </div>
    <div class="footer-credit col three-to-six padding">
      <small>
        <a href="http://www.mathieugrac.com" target="_blank" rel="noopener noreferrer">
          Made with ❤ for my sister
        </a>
      </small>
    </div>
  </div>
</footer>
