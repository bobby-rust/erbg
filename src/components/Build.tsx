import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Item } from "../classes/Item";
import { ItemCategory } from "../types/enums";
import "../App.css";
import CardColumn from "./CardColumn";
import { ErrorBoundary } from "react-error-boundary";
import BuildGenerator from "../classes/BuildGenerator";
import { ArmorCategories } from "../types/constants";
const generator = new BuildGenerator();

// TODO: Make this a reusable component to use with AI builds.
export default function Build() {
	const [armors, setArmors] = React.useState<Item[]>([]);

	const { buildUrl } = useParams();

	if (!buildUrl) {
		throw new Error("Invalid path");
	}

	const navigate = useNavigate();

	const [build, setBuild] = React.useState<Map<ItemCategory, Item[]> | null>(generator.generateBuildFromUrl(buildUrl));

	const handleReroll = () => {
		// if i keep track of the state of the build separately, i can avoid refreshing the page
		// every time the build changes.
		const newUrl = generator.generateUrl();

		navigate(`../${newUrl}`, { replace: true });
		setBuild(generator.generateBuildFromUrl(newUrl));
	};

	const handleRerollItem = (c: ItemCategory, i: number | undefined) => {
		if (typeof i === "undefined") return;

		const newBuildMap = generator.rerollItem(c, i);
		const newUrl = generator.createUrlFromBuildMap(newBuildMap);

		navigate(`../${newUrl}`, { replace: true });
		setBuild(generator.generateBuildFromUrl(newUrl));
	};

	const handleChangeNumItems = (c: ItemCategory, numItems: number) => {
		generator.setNumItems(c, numItems);
	};

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

		console.log(build);
	}, [build]);

	React.useEffect(() => {
		console.log(armors);
	}, [armors]);
	return (
		<ErrorBoundary fallback={<h1>Something went wrong</h1>}>
			<div className="App px-14 py-8">
				<div className="flex w-full justify-center align-center mb-10 p-3">
					<button className="btn btn-lg btn-primary" onClick={handleReroll}>
						<h1>Generate New Build</h1>
					</button>
				</div>
				<div className="flex justify-center align-center max-w-full">
					<div className="grid grid-cols-1 sm:grid-cols-2 2lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2.5xl:grid-cols-6 3xl:grid-cols-7 4xl:grid-cols-8 gap-4 auto-cols-auto">
						{build &&
							[...build.keys()].map((c: ItemCategory, i: number) => (
								<>
									{!ArmorCategories.has(c) && c !== ItemCategory.Classes && (
										<CardColumn
											key={i}
											items={build.get(c) ?? []}
											reroll={handleRerollItem}
											setNumItems={handleChangeNumItems}
											isAIBuild={false}
											category={c}
										/>
									)}
									{c === ItemCategory.Helm && (
										<CardColumn
											key={i}
											items={armors}
											reroll={handleRerollItem}
											setNumItems={handleChangeNumItems}
											isAIBuild={false}
											category={c}
										/>
									)}
								</>
							))}
					</div>
				</div>
			</div>
		</ErrorBoundary>
	);
}
