class StringHelperClass {
    public firstToUpperAndRestToLower(value: string) {
        var words = value.split(' ').map(x => {
            var word = x.trim();
            return `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;
        });

        return words.join(" ");
    }
}

export const StringHelper = new StringHelperClass();