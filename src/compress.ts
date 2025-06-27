export const Compress = {
    compress: (arr: number[], sorting = true) => {
        const temp = sorting ? [...arr].sort((a, b) => a - b) : [...arr];

        let range = [];
        let result = [];
        let multiplies = 1;

        for (let i = 0; i < temp.length; i++) {
            const current = temp[i];
            const next = temp[i + 1];

            if (next) {
                if (current === next) {
                    multiplies++;
                    continue;
                } else if (next - current === 1) {
                    if (!range.length) {
                        range.push(current);
                    }

                    range[1] = next;
                    continue;
                }
            }

            if (multiplies > 1) {
                result.push(`${current}#${multiplies}`);
                multiplies = 1;
            }

            if (range.length) {
                result.push(`${range[0]}_${range[1]}`);
                range = [];
            } else {
                result.push(current);
            }
        }

        return result.join("|");
    },

    decompress: (str: string) => {
        const arr = str.split("|");
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            const current = arr[i];

            // IT IS RANGE?
            if (current.indexOf("_") >= 0) {
                const range = current.split("_");
                const start = Number(range[0]);
                const end = Number(range[1]);

                for (let i = start; i < end; i++) {
                    result.push(i);
                }
            }

            // IT IS MULTIPLIER?
            if (current.indexOf("#") >= 0) {
                const [number, multiplier] = current.split("#");

                result.push(...new Array(multiplier).fill(number));
            }

            result.push(current);
        }

        return result;
    },
};
