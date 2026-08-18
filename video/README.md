# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

## Party Promo Reel

A 25-second, 9:16 party/celebration ad cut from `public/reel-1.mp4` (villa
showcase) and `public/reel-2.mp4` (pool party), composition id
`PartyPromoReel`.

**Editing the cut.** Everything about the edit — shot order, in/out trim
points, on-screen duration, camera effect (punch-in zoom / Ken Burns pan),
speed ramps, transitions, and text — lives in one place:
[`src/edit-config.ts`](src/edit-config.ts). The composition's total duration
is derived from that list, and the closing outro shot auto-fills whatever
time is left, so the whole thing always lands on exactly 25s no matter how
you re-time the earlier scenes. Visual effects live in
[`src/components/Scene.tsx`](src/components/Scene.tsx), captions in
[`src/components/Captions.tsx`](src/components/Captions.tsx).

**Audio.** The party-ambience bed under the whole edit is
`public/ambient-bed.webm` (Opus), extracted from reel-2's own audio via:

```console
ffmpeg -i public/reel-2.mp4 -vn -c:a libopus -b:a 96k public/ambient-bed.webm
```

To swap in a licensed music track instead, set `MUSIC_TRACK_SRC` at the top
of [`src/components/AmbientBed.tsx`](src/components/AmbientBed.tsx).

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render PartyPromoReel out/party-promo-reel.mp4
```

> **Sandboxed/offline environments only:** if `remotion render` can't reach
> `remotion.media` to download its browser, point it at a locally installed
> Chromium/Chrome-Headless-Shell instead — set `REMOTION_BROWSER_EXECUTABLE`
> to its path before rendering (`remotion.config.ts` picks it up
> automatically), and if outbound HTTPS goes through a proxy with its own CA
> (breaking the Google Fonts fetch), also set `REMOTION_IGNORE_CERT_ERRORS=1`.
> Neither is needed on a normal machine.

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
