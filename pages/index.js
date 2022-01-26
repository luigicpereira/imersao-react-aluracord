import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, Image, Text, TextField } from "@skynexui/components";
import appConfig from "../config.json";

function Titulo(props) {
	const Tag = props.tag || "h1";
	return (
		<>
			<Tag>{props.children}</Tag>
			<style jsx>{`
				${Tag} {
					color: ${appConfig.theme.colors.neutrals["000"]};
					font-size: 24px;
					font-weight: 600;
				}
			`}</style>
		</>
	);
}

// function HomePage() {
// 	return (
// 		<div>
// 			<GlobalStyle />

// 			<h1>Boas vindas de volta!</h1>
// 			<h2>Aluracord - Alura Matrix</h2>

// 			<style jsx>{`
// 				h1 {
// 					color: ${appConfig.theme.colors.primary["500"]};
// 				}
// 			`}</style>
// 		</div>
// 	);
// }

export default function PaginaInicial() {
	const [userInputValue, setUserInputValue] = useState("");
	const [username, setUsername] = useState("");
	const [name, setName] = useState("");
	const roteamento = useRouter();

	useEffect(() => {
		if (!username) return;

		fetch(`https://api.github.com/users/${username}`).then((response) => {
			if (response.status === 200) {
				response.json().then((data) => {
					setName(data.name);
				});
			}
		});
	}, [username]);

	return (
		<>
			<Box
				styleSheet={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: appConfig.theme.colors.primary["050"],
					backgroundImage:
						// "url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)",
						"url(https://www.gov.br/pt-br/noticias/financas-impostos-e-gestao-publica/2019/12/numero-de-investidores-ativos-no-tesouro-direto-cresce-56-em-um-ano/money-2696219_1920.jpg)",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					backgroundBlendMode: "multiply",
				}}
			>
				<Box
					styleSheet={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						flexDirection: {
							xs: "column",
							sm: "row",
						},
						width: "100%",
						maxWidth: "700px",
						borderRadius: "5px",
						padding: "32px",
						margin: "16px",
						boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
						backgroundColor: `${appConfig.theme.colors.neutrals[700]}dd`,
					}}
				>
					{/* Formulário */}
					<Box
						as="form"
						onSubmit={(event) => {
							event.preventDefault();
							roteamento.push(`/chat`);
						}}
						styleSheet={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							width: { xs: "100%", sm: "50%" },
							textAlign: "center",
							marginBottom: "32px",
						}}
					>
						<Titulo tag="h2">
							Boas vindas de volta{name ? `, ${name}` : ""}!
						</Titulo>
						<Text
							variant="body3"
							styleSheet={{
								marginBottom: "32px",
								color: appConfig.theme.colors.neutrals[300],
							}}
						>
							{appConfig.name}
						</Text>

						<TextField
							fullWidth
							textFieldColors={{
								neutral: {
									textColor: appConfig.theme.colors.neutrals[200],
									mainColor: appConfig.theme.colors.neutrals[900],
									mainColorHighlight: appConfig.theme.colors.primary[500],
									backgroundColor: appConfig.theme.colors.neutrals[800],
								},
							}}
							value={userInputValue}
							onChange={(event) => {
								setUserInputValue(event.target.value);

								if (event.target.value.length > 2) {
									setUsername(event.target.value);
								} else {
									setUsername("");
								}
							}}
						/>
						<Button
							type="submit"
							label="Entrar"
							fullWidth
							buttonColors={{
								contrastColor: appConfig.theme.colors.neutrals["000"],
								mainColor: appConfig.theme.colors.primary[500],
								mainColorLight: appConfig.theme.colors.primary[400],
								mainColorStrong: appConfig.theme.colors.primary[600],
							}}
						/>
					</Box>
					{/* Formulário */}

					{/* Photo Area */}
					<Box
						styleSheet={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							maxWidth: "200px",
							padding: "16px",
							backgroundColor: appConfig.theme.colors.neutrals[800],
							border: "1px solid",
							borderColor: appConfig.theme.colors.neutrals[999],
							borderRadius: "10px",
							flex: 1,
							minHeight: "240px",
						}}
					>
						<Image
							styleSheet={{
								borderRadius: "50%",
								marginBottom: "16px",
							}}
							src={username ? `https://github.com/${username}.png` : ""}
						/>
						<Text
							variant="body4"
							styleSheet={{
								color: appConfig.theme.colors.neutrals[200],
								backgroundColor: appConfig.theme.colors.neutrals[900],
								padding: "3px 10px",
								borderRadius: "1000px",
							}}
						>
							{username}
						</Text>
					</Box>
					{/* Photo Area */}
				</Box>
			</Box>
		</>
	);
}
