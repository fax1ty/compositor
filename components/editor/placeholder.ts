export const placeholder = `version: "3.7"

services:
  caddy:
    image: caddy:<version>
    restart: unless-stopped
    cap_add:
      - NET_ADMIN
    ports:
      - "80:80"
      - "443:443"
      - "443:443/udp"
    volumes:
      - $PWD/Caddyfile:/etc/caddy/Caddyfile
      - $PWD/site:/srv
      - caddy_data:/data
      - caddy_config:/config

volumes:
  caddy_data:
    external: true
  caddy_config:
      `;
