import {
    useRef,
    PropsWithChildren,
    cloneElement,
    isValidElement,
    ReactElement,
} from 'react';
import { usePlaceholderTypingEffect } from './usePlaceholderTypingEffect';

type PlaceholderTypingEffectProps = {
    placeholderTexts: string[];
    typingSpeed?: number;
    pauseDuration?: number;
};

function PlaceholderTypingEffect({
    placeholderTexts,
    children,
}: PropsWithChildren<PlaceholderTypingEffectProps>) {
    const inputRef = useRef<HTMLInputElement>(null);
    const hiddenPlaceholderRef = useRef<HTMLInputElement>(null);

    const { placeholder, hiddenPlaceholder } = usePlaceholderTypingEffect({
        placeholderTexts,
        inputRef,
        hiddenPlaceholderRef,
        typingSpeed: 75,
        pauseDuration: 1000,
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
                ref={hiddenPlaceholderRef}
                style={{
                    width: 'fit-content',
                    position: 'absolute',
                    visibility: 'hidden',
                }}
            >
                {hiddenPlaceholder}
            </span>
            {isValidElement(children)
                ? cloneElement(children as ReactElement, {
                      ref: inputRef,
                      placeholder: placeholder,
                  })
                : children}
        </div>
    );
}

export default PlaceholderTypingEffect;
