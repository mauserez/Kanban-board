type DefaultAssocArrayObject = {
	[key: string | number]: string | boolean | number;
};

type DefaultAssocArray = DefaultAssocArrayObject[];

export const editAssocArray = (
	array: DefaultAssocArray,
	object: DefaultAssocArrayObject,
	field: string
) => {
	return array.map((o: DefaultAssocArrayObject) => {
		if (o[field] === object[field]) {
			return object;
		}
		return o;
	});
};

export const filterAssocArray = (
	array: DefaultAssocArray,
	object: DefaultAssocArrayObject,
	field: string
) => {
	return array.filter((o: DefaultAssocArrayObject) => {
		return o[field] !== object[field];
	});
};
