import { updateFilters } from "@/features/filters/actions";
import { useAppSelector } from "@/features/hooks";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Filter = () => {
	const getUniqueValues = (data: any, type: string) => {
		let unique = data.map((item: any) => item[type]);
		if (type === "colors") {
			unique = unique.flat();
		}
		unique = unique.filter(
			(value: any, index: number, array: any) => array.indexOf(value) === index
		);
		return ["all", ...unique];
	};

	const {
		filters: { title, category },
		all_posts,
	} = useAppSelector((store) => store.filters);

	const categories = getUniqueValues(all_posts, "category");

	return (
		<div className="w-2/12">
			<form onSubmit={(e) => e.preventDefault()}>
				{/* search input */}
				<div className="flex items-center justify-between w-full bg-white rounded-sm px-3 py-2">
					<input
						type="text"
						name="title"
						placeholder="Search"
						value={title}
						onChange={updateFilters}
						className="bg-transparent focus:outline-none"
					/>
					<AiOutlineSearch className="text-slate-600" size={25} />
				</div>

				{/* categories */}
				<div className="mt-5 flex flex-col gap-2 bg-white p-4 rounded-sm">
					<h1 className="font-bold text-slate-600 tracking-wider">Category</h1>
					<div className="flex flex-col gap-2 items-start">
						{categories.map((c: any, index: number) => {
							return (
								<button
									key={index}
									onClick={updateFilters}
									type="button"
									name="category"
									className={`${
										category === c.toLowerCase()
											? "border-b border-green-700"
											: ""
									} capitalize text-slate-500 font-light text-[15px] lg:text-[17px]`}
								>
									{c}
								</button>
							);
						})}
					</div>
				</div>
			</form>
		</div>
	);
};

export default Filter;
