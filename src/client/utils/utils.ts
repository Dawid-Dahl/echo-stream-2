export const removeHashtagAndSpacesFromString = (str: string) => str.replace(/#|\s/g, "");

export const sanitizeStringUnconfig = (...fns: Array<(x: string) => string>) => (
	str: string
): string => fns.reduce((acc, cur) => cur(acc), str);

export const sanitizeString = sanitizeStringUnconfig(
	removeHashtagAndSpacesFromString,
	(str: string) => str.toLocaleLowerCase()
);
