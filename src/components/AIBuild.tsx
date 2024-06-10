import React from "react";
import BuildGenerator from "../classes/BuildGenerator";
import { useParams } from "react-router-dom";
import { ItemCategory } from "../types/enums";
import { Item } from "../classes/Item";
import { ArmorCategories } from "../types/constants";
import CardColumn from "./CardColumn";

const generator = new BuildGenerator();

export default function AIBuild() {
	const { buildUrl } = useParams();

	if (!buildUrl) {
		throw new Error("Invalid path");
	}

	const [build, setBuild] = React.useState<Map<ItemCategory, Item[]> | null>(generator.generateBuildFromUrl(buildUrl));
	const [armors, setArmors] = React.useState<Item[]>([]);

	React.useEffect(() => {
		if (build) {
			const newArmors: Item[] = [];
			[...build.keys()].forEach((c: ItemCategory) => {
				if (ArmorCategories.has(c) && build.get(c)) {
					newArmors.push(...(build.get(c) ?? []));
				}
			});
			setArmors(newArmors);
		}
	}, [build]);

	React.useEffect(() => {}, [armors]);

	return (
		<div className="flex flex-col justify-center items-center">
			<h1>AI Build</h1>
			<div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
				{build &&
					[...build.keys()].map((c: ItemCategory, i: number) => (
						<React.Fragment key={i}>
							{/* TODO: fix this garbage */}
							{!ArmorCategories.has(c) && <CardColumn key={i} items={build.get(c) ?? []} reroll={null} />}
							{c === ItemCategory.Helm && <CardColumn key={i} items={armors} reroll={null} />}
						</React.Fragment>
					))}{" "}
			</div>
		</div>
	);
}
