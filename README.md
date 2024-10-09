# React Placeholder Typing Effect

A React hook that animates input placeholders with a typing effect.

## Installation

To install the package, run the following command:

```bash
npm install react-placeholder-typing-effect
```

## Usage

Once installed, you can use the component in your React project as follows:

```tsx
import PlaceholderTypingEffect from 'react-placeholder-typing-effect';

const PLACEHOLDER_TEXTS = [
    'Search for any products...',
    'What are you looking for?',
    'Find great deals and discover new items!',
];
const ANIMATION_SPEED = 61;
const DISPLAY_DURATION = 1600;

export default function App() {
    return (
        <PlaceholderTypingEffect
            placeholderTexts={PLACEHOLDER_TEXTS}
            typingSpeed={ANIMATION_SPEED} // Optional
            pauseDuration={DISPLAY_DURATION} // Optional
        >
            <input type="text" className="input-field" />
        </PlaceholderTypingEffect>
    );
}
```
