import React, { useEffect } from "react";

import Lion from "../img/kazan-logo.svg";
import Icon from "../img/uslugi-logo.svg";
// import * as imgs from "../img/bg-images";

import { USLUGI_APP_AUTH_POINT } from "../../../configs/envs";

import "./Welcome.scss";

export default function Welcome() {
	// const backgroundImages = imgs;
	const citates = [];

	// function randomIndex(min, max) {
	// 	// случайное число от min до (max+1)
	// 	const rand = min + Math.random() * (max + 1 - min);

	// 	return ~~rand;
	// }

	// const currentBg = backgroundImages[randomIndex(1, 10)];
	// const currentCit = citates[randomIndex(1, 10)];

	function handleClick(event) {
		event.preventDefault();

		const authPath = event.currentTarget.href;

		(authPath ? location.replace(authPath) : console.warn("Auth URL is not found"))();
	}

	useEffect(() => {
		document.body.classList.add("start");

		return () => document.body.classList.remove("start");
	}, []);

	return (
		<div className="container">
			<div className={"welcome"}>
				<div className={"welcome__lion-wrapper"}>
					<div className={"lion-block"}>
						<div className={"lion-block__img"}>
							<img src={Lion} alt={"Казань"} title={"Казань"} />
						</div>
						<div className={"lion-block__button"}>
							<a
								href={USLUGI_APP_AUTH_POINT}
								className={"welcome__button"}
								onClick={handleClick}
							>
								<img
									className={"button__logo"}
									src={Icon}
									alt={"Услуги Казань"}
									title={"Услуги Казань"}
								/>
								<span className={"button__text"}>
                        Войти через <br /> госуслуги
								</span>
							</a>
						</div>
					</div>
				</div>
				<div className={"welcome__text-wrapper"}>
					<div className={"welcome__text-wrapper-main"}>
						<div className={"text-block"}>
							<h3 className={"text-block__title"}>
                    услуги <i>казань</i>
							</h3>
						</div>
					</div>
				</div>

				{/* <div className={"welcome__icon"}>
					<img src={Lion} alt={"Казань"} title={"Казань"} />
				</div>
				<h3 className={"welcome__title"}>
                    услуги <i>казань</i>
				</h3>
				<a
					href={USLUGI_APP_AUTH_POINT}
					className={"welcome__button"}
					onClick={handleClick}
				>
					<img
						className={"button__logo"}
						src={Icon}
						alt={"Услуги Казань"}
						title={"Услуги Казань"}
					/>
					<span className={"button__text"}>
                        Войти через <br /> госуслуги
					</span>
				</a> */}
			</div>
		</div>
	);
}
