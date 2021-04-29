# React-Native-Vexflow

Make Vexflow work on react native. Tried to make it deliciously simple.

## Installation

Use npm to install this non-sense tool.

```bash
npm install react-native-vexflow
```

## Credit

I really need to give credit first, this repository are the backbone of this package.
standalone-vexflow-context: https://github.com/panarch/standalone-vexflow-context

## Usage

There is ONE and ONLY hook provided (No wonder I said it is non-sense)

```javascript
import { useScore } from 'react-native-vexflow'; // import the one and only thing provided
import React from 'react';
import { View } from 'react-native';
import Vex from 'vexflow';

const SomeReactComponent = () => {
	const [context, stave] = useScore({
		contextSize: { x: 300, y: 300 }, // this determine the canvas size
		staveOffset: { x: 5, y: 5 }, // this determine the starting point of the staff relative to top-right corner of canvas
		staveWidth: 250, // ofc, stave width
		clef: 'treble', // clef
		timeSig: '4/4', // time signiture
	});

	// you got your context, you got your stave, you can do your stuff now

	// picked from Vexflow tutorial: https://github.com/0xfe/vexflow/wiki/The-VexFlow-Tutorial
	const VF = Vex.Flow;
	var notes = [
		// A quarter-note C.
		new VF.StaveNote({ clef: 'treble', keys: ['c/4'], duration: 'q' }),

		// A quarter-note D.
		new VF.StaveNote({ clef: 'treble', keys: ['d/4'], duration: 'q' }),

		// A quarter-note rest. Note that the key (b/4) specifies the vertical
		// position of the rest.
		new VF.StaveNote({ clef: 'treble', keys: ['b/4'], duration: 'qr' }),

		// A C-Major chord.
		new VF.StaveNote({
			clef: 'treble',
			keys: ['c/4', 'e/4', 'g/4'],
			duration: 'q',
		}),
	];

	// Create a voice in 4/4 and add the notes from above
	var voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
	voice.addTickables(notes);

	// Format and justify the notes to 200 pixels.
	var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 200);

	// Render voice
	voice.draw(context, stave);

	return <View>{context.render()}</View>;
};
```

## Last words

You got the context, you got the staff. Now scram. Remember to learn Vexflow (https://github.com/0xfe/vexflow/wiki/The-VexFlow-Tutorial) before using it or else you still a dumb like me.

## Contributing

Sure! You masters can contribute to this stuff, make it contain more functionality. After all I am just a random guy who used React for only 3 month and I am drunk right now.

## License

Who DOES license stuff when he / she is drunk?
