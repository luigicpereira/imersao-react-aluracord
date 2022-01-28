import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React, { useState } from "react";
import appConfig from "../config.json";

export default function ChatPage() {
	const [mensagem, setMensagem] = useState("");
	const [listaDeMensagens, setListaDeMensagens] = useState([]);

	function handleNovaMensagem(novaMensagem) {
		setListaDeMensagens((oldState) => [
			{
				id: oldState.length + 1,
				de: "um usuário qualquer",
				texto: novaMensagem,
			},
			...oldState,
		]);
		setMensagem("");
	}

	function handleDeletaMensagem(id) {
		setListaDeMensagens((oldState) =>
			oldState.filter((mensagem) => mensagem.id !== id)
		);
	}

	return (
		<Box
			styleSheet={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: appConfig.theme.colors.primary["050"],
				backgroundImage: `url(https://www.gov.br/pt-br/noticias/financas-impostos-e-gestao-publica/2019/12/numero-de-investidores-ativos-no-tesouro-direto-cresce-56-em-um-ano/money-2696219_1920.jpg)`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				backgroundBlendMode: "multiply",
				color: appConfig.theme.colors.neutrals["000"],
			}}
		>
			<Box
				styleSheet={{
					display: "flex",
					flexDirection: "column",
					flex: 1,
					boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
					borderRadius: "5px",
					backgroundColor: `${appConfig.theme.colors.neutrals[700]}dd`,
					height: "100%",
					maxWidth: "95%",
					maxHeight: "95vh",
					padding: "32px",
				}}
			>
				<Header />
				<Box
					styleSheet={{
						position: "relative",
						display: "flex",
						flex: 1,
						height: "80%",
						backgroundColor: `${appConfig.theme.colors.neutrals[600]}88`,
						flexDirection: "column",
						borderRadius: "5px",
						padding: "16px",
					}}
				>
					<MessageList
						mensagens={listaDeMensagens}
						deleteFunction={handleDeletaMensagem}
					/>

					<Box
						as="form"
						styleSheet={{
							display: "flex",
							alignItems: "flex-start",
						}}
					>
						<TextField
							value={mensagem}
							onChange={(e) => {
								setMensagem(e.target.value);
							}}
							onKeyPress={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									handleNovaMensagem(mensagem);
								}
							}}
							placeholder="Insira sua mensagem aqui..."
							type="textarea"
							styleSheet={{
								width: "100%",
								border: "0",
								resize: "none",
								borderRadius: "5px",
								padding: "6px 8px",
								backgroundColor: appConfig.theme.colors.neutrals[800],
								marginRight: "12px",
								color: appConfig.theme.colors.neutrals[200],
							}}
						/>
						<Button
							variant="primary"
							label="Enviar"
							styleSheet={{
								height: "44px",
							}}
							onClick={() => {
								handleNovaMensagem(mensagem);
							}}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

function Header() {
	return (
		<>
			<Box
				styleSheet={{
					width: "100%",
					marginBottom: "16px",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Text variant="heading5">Chat</Text>
				<Button
					variant="tertiary"
					colorVariant="neutral"
					label="Logout"
					href="/"
				/>
			</Box>
		</>
	);
}

function MessageList(props) {
	return (
		<Box
			tag="ul"
			styleSheet={{
				overflow: "auto",
				display: "flex",
				flexDirection: "column-reverse",
				flex: 1,
				color: appConfig.theme.colors.neutrals["000"],
				marginBottom: "16px",
			}}
		>
			{props.mensagens.map((mensagem) => (
				<Text
					key={mensagem.id}
					tag="li"
					styleSheet={{
						borderRadius: "5px",
						padding: "6px",
						marginBottom: "12px",
						hover: {
							backgroundColor: appConfig.theme.colors.neutrals[700],
						},
					}}
				>
					<Box
						styleSheet={{
							marginBottom: "8px",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<Box>
							<Image
								styleSheet={{
									width: "20px",
									height: "20px",
									borderRadius: "50%",
									display: "inline-block",
									marginRight: "8px",
								}}
								src={`https://github.com/vanessametonini.png`}
							/>
							<Text tag="strong">{mensagem.de}</Text>
							<Text
								styleSheet={{
									fontSize: "10px",
									marginLeft: "8px",
									color: appConfig.theme.colors.neutrals[300],
								}}
								tag="span"
							>
								{new Date().toLocaleDateString()}
							</Text>
						</Box>
						<Button
							label="x"
							variant="secondary"
							styleSheet={{
								width: "24px",
								height: "24px",
							}}
							onClick={() => {
								props.deleteFunction(mensagem.id);
							}}
						/>
					</Box>
					{mensagem.texto}
				</Text>
			))}
		</Box>
	);
}
