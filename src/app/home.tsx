import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../store/store";
import { useGetCatsQuery } from "../services/catsService";
import CatsGridWithFiltration from "../components/CatsGrid";
import Charts from "../components/Charts";
import Loader from "../components/Loader";

const HomePage: React.FC = () => {
	const navigate = useNavigate();
	const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/sign-in");
		}
	}, [isAuthenticated, navigate]);

	const { data: cats, isLoading, error } = useGetCatsQuery();

	return !(isLoading || error) && cats ? (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-8">Cat Breeds Statistics</h1>
			<Charts cats={cats} />
			<CatsGridWithFiltration cats={cats} />
		</div>
	) : (
		<Loader isLoading={isLoading} />
	);
};

export default HomePage;
