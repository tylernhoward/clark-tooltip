# clark-tooltip

Basic tooltip directive to be used in CLARK system.

## Installation

To install this library, run:

```bash
$ npm install clark-tooltip --save
```

## Using

From your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import module
import { TooltipModule } from 'clark-tooltip';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // Specify as an import
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

These are all the directive options below:
```xml
<!-- You can now use in any component like so -->
<h1>
  Welcome to <span tip="This is the name of my site" tipLocation="above">{{strangeTitle}}</span>!
</h1>

<h6 tipTitle= "tip title" tip="tip text" tipDisabled="{{expression}}" tipTheme="good|bad|neutral|light|dark">Subtitle</h6>

<p>Confusing sentence with <span tip="This is a word" tipLocation="left">words</span></p>

<button tip="Click me!" tipLocation="right" tipDelay="1000">Mysterious Button with 1 second delay</button>

```
Make sure to place within an inline element of some sort. Spans are your friend.

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

## License

MIT © Tyler Howard
