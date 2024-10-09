import { useEffect, useState, useRef } from 'react';

interface UsePlaceholderTypingEffectProps {
    placeholderTexts: string[];
    inputRef: React.RefObject<HTMLInputElement>;
    hiddenPlaceholderRef: React.RefObject<HTMLSpanElement>;
    typingSpeed?: number;
    pauseDuration?: number;
}

export function usePlaceholderTypingEffect({
    placeholderTexts,
    inputRef,
    hiddenPlaceholderRef,
    typingSpeed = 75,
    pauseDuration = 1000,
}: UsePlaceholderTypingEffectProps) {
    const [placeholder, setPlaceholder] = useState('');
    const [hiddenPlaceholder, setHiddenPlaceholder] = useState('');
    const currentIndex = useRef(0);
    const currentCharIndex = useRef(0);
    const scrollStartIndex = useRef(0);

    useEffect(() => {
        const typeText = () => {
            const text = placeholderTexts[currentIndex.current];

            const fullText = text.slice(0, currentCharIndex.current + 1);
            setHiddenPlaceholder(fullText);

            if (
                currentCharIndex.current > 0 &&
                inputRef.current &&
                hiddenPlaceholderRef.current
            ) {
                const inputWidth = parseFloat(
                    window.getComputedStyle(inputRef.current).width
                );
                const hiddenWidth = parseFloat(
                    window.getComputedStyle(hiddenPlaceholderRef.current).width
                );

                if (hiddenWidth >= inputWidth) {
                    scrollStartIndex.current++;
                }
            }

            const visibleText = fullText.slice(scrollStartIndex.current);
            setPlaceholder(visibleText);
            currentCharIndex.current++;

            if (currentCharIndex.current >= text.length) {
                clearInterval(typingInterval);
                setTimeout(() => {
                    currentIndex.current =
                        (currentIndex.current + 1) % placeholderTexts.length;
                    currentCharIndex.current = 0;
                    scrollStartIndex.current = 0;
                    setPlaceholder('');
                    startTyping();
                }, pauseDuration);
            }
        };

        const startTyping = () => {
            typingInterval = setInterval(typeText, typingSpeed);
        };

        let typingInterval = setInterval(typeText, typingSpeed);

        return () => clearInterval(typingInterval);
    }, [
        placeholderTexts,
        typingSpeed,
        pauseDuration,
        inputRef,
        hiddenPlaceholderRef,
    ]);

    return { placeholder, hiddenPlaceholder };
}
