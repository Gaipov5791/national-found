<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Render a lightweight shared panorama and navigation during animation loading; identical CSS framing prevents a dark first paint and handoff jumps.
- Keep panorama image URLs and preview pointers in sceneImages; route preloads and displayed imagery must share the same source.
- Use pageMeta for detail-route metadata so titles and social descriptions remain local to each content page.
