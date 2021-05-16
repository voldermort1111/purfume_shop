export class KNN {
	public dataSet = [
		[2.7810836, 2.550537003, 0],
		[1.465489372, 2.362125076, 0],
		[3.396561688, 4.400293529, 0],
		[1.38807019, 1.850220317, 0],
		[3.06407232, 3.005305973, 0],
		[7.627531214, 2.759262235, 1],
		[5.332441248, 2.088626775, 1],
		[6.922596716, 1.77106367, 1],
		[8.675418651, -0.242068655, 1],
		[7.673756466, 3.508563011, 1],
	];

	constructor() {
		const neighbors = getNeighbors(this.dataSet, this.dataSet[0], 3);
		console.log(neighbors);
		// for (const iterator of this.dataSet) {
		// 	// console.log(euclideanDistance(this.dataSet[0], iterator));
		// }
	}
}

// Calculate the Euclidean distance between two vectors
function euclideanDistance(row1: number[], row2: number[]) {
	let distance = 0;
	for (let i = 0; i < row1.length - 1; i++) {
		// skip last col
		distance += (row1[i] - row2[i]) ** 2;
	}
	return Math.sqrt(distance);
}

// Locate the most similar neighbors
function getNeighbors(train: number[][], testRow: number[], numNeighbors: number) {
	const distances = [] as { trainRow: number[]; dist: number }[];
	for (const trainRow of train) {
		const dist = euclideanDistance(testRow, trainRow);
		distances.push({ trainRow, dist });
	}
	distances.sort((a, b) => a.dist - b.dist);
	return distances.splice(0, numNeighbors).map(dis => dis.trainRow);
}

// Make a prediction with neighbors
function predictClassification(train: number[][], testRow: number[], numNeighbors: number) {
	const neighbors = getNeighbors(train, testRow, numNeighbors);
	// const outputValues = [row[-1] for row in neighbors]
	// prediction = max(set(output_values), key=output_values.count)
	// return prediction
}
