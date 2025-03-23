import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./app/home";
import StoreProvider from "./components/StoreProvider";
import UIProvider from "./components/UIProvider";
import SignInPage from "./app/signIn";
import React from "react";
import ThemeProvider from "./components/ThemeProvider";

const App = () => {
	return (
		<React.StrictMode>
			<StoreProvider>
				<ThemeProvider>
					<BrowserRouter>
						<Routes>
							<Route
									path="/"
									element={
											<PageWrapper>
												<HomePage />
											</PageWrapper>
									}
								/>
							<Route
								path="/sign-in"
								element={
									<PageWrapper>
										<SignInPage />
									</PageWrapper>
								}
							/>
						</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</StoreProvider>
		</React.StrictMode>
	);
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
	return <UIProvider>{children}</UIProvider>;
};

export default App;
