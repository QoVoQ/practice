function main() {
    try {
        setTimeout(function inner() {
            console.trace('show stack --- before error')
            throw new Error('error!');
        }, 300)
        console.trace('show stack --- try')
    } catch (e) {
            console.log('Error caught?')

    }

    console.trace('show stack --- main')    
}

main()