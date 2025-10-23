# toy-components

This application consists of the following two parts:

- `main.tsx` and `stories/`<br/>
  A system that provides simple sample pages based on the filenames in `stories/`.
  By writing `.tsx` files in a format similar to [Component Story Format](https://storybook.js.org/docs/api/csf) (note: not compatible), you can easily create a component catalog.
  Inspired by [myuon/mu-ui](https://github.com/myuon/mu-ui/tree/main/uibook), but each page is loaded individually via dynamic import.
- Components displayed in `stories/` (e.g. `AutoResizingTextarea.tsx`)<br/>
  A proof of concept (PoC) for slightly complex React components.
  Includes components implemented in other repositories.

# License

MIT
