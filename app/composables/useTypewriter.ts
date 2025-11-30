export function useTypewriter(phrases: string[]) {
    const placeholderText = ref("")
    let phraseIndex = 0
    let charIndex = 0
    let isDeleting = false
    let typeTimeout: NodeJS.Timeout | null = null

    const type = () => {
        const currentPhrase = phrases[phraseIndex] || ""

        if (isDeleting) {
            placeholderText.value = currentPhrase.substring(0, charIndex - 1)
            charIndex--
        } else {
            placeholderText.value = currentPhrase.substring(0, charIndex + 1)
            charIndex++
        }

        let typeSpeed = 100

        if (isDeleting) {
            typeSpeed /= 2
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true
            typeSpeed = 2000 // Pause at end of phrase
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false
            phraseIndex = (phraseIndex + 1) % phrases.length
            typeSpeed = 500 // Pause before typing next phrase
        }

        typeTimeout = setTimeout(type, typeSpeed)
    }

    onMounted(() => {
        type()
    })

    onUnmounted(() => {
        if (typeTimeout) clearTimeout(typeTimeout)
    })

    return {
        placeholderText
    }
}
