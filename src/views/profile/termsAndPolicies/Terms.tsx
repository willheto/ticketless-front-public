import React from 'react';
import { useTranslation } from 'react-i18next';
import View from '@src/components/layout/View';

const TermsContent = (): JSX.Element => {
	const { t, i18n } = useTranslation();
	return (
		<>
			{i18n.language === 'fi' ? (
				<div className="p-3 h-100 d-flex flex-column overflow-auto">
					<h3>{t('profile.ticketlessTerms')}</h3>

					<p>{t('profile.termsDescription')}</p>
					<p>
						Käyttämällä Sovellusta hyväksyt nämä käyttöehdot. Mikäli
						Käyttäjä ei hyväksy näitä käyttöehtoja, Käyttäjän tulee
						lopettaa välittömästi Sovelluksen käyttö sekä olla
						jakamatta mitään sisältöä tai tietoja Sovelluksessa.
					</p>
					<p>
						<b>Palveluntarjoajan oikeudet ja velvollisuudet</b>
					</p>
					<p>
						Ticketless Oy:llä (myöhemmin ”Palveluntarjoaja”) on
						oikeus päättää Sovelluksen tarjoamisesta tai sen
						tarjoamisen lopettamisesta. Palveluntarjoajalla on
						oikeus parantaa ja muuttaa Sovelluksen sisältöä sekä
						käyttöehtoja kaikilta osin yksipuolisella päätöksellään.
						Palveluntarjoaja ilmoittaa merkittävistä Sovelluksen
						sisällön sekä käyttöehtojen muutoksista Käyttäjälleen
						parhaaksi valitsemallaan tavalla.
					</p>
					<p>
						Palveluntarjoajalla on oikeus poistaa Sovelluksestaan
						sellainen sisältö, jonka Palveluntarjoaja on kieltänyt,
						jonka muut Käyttäjät kokevat loukkaavaksi tai joka on
						Palveluntarjoajan näkemyksen mukaan lain tai hyvän tavan
						vastaista tai muuten sopimatonta. Lisäksi
						Palveluntarjoajalla on oikeus poistaa tällaista sisältöä
						Sovellukseen lisäävät käyttäjät. Palveluntarjoaja ei ole
						velvollinen ilmoittamaan Käyttäjälle edellä mainituista
						syistä johtuneesta aineiston poistamisesta.
					</p>
					<p>
						Palveluntarjoaja ei vastaa Käyttäjien välisen viestinnän
						toisille käyttäjille tai kolmansille osapuolille
						mahdollisesti aiheuttamista haitoista tai vahingoista.
					</p>
					<p>
						<b>Käyttäjän oikeudet ja velvollisuudet</b>
					</p>
					<p>
						Käyttäjä saa nämä käyttöehdot hyväksymällä oikeuden
						käyttää Sovellusta käyttöehtojen mukaisesti. Käyttäjä
						sitoutuu käyttämään Sovellusta käyttöehtojen, lakien
						sekä hyvän tavan mukaisella tavalla.
					</p>
					<p>
						Sovellukseen ei saa lisätä voimassa olevan lain tai
						hyvän tavan vastaista materiaalia. Tällaiseksi on
						katsottava muun muassa materiaali, joka sisältää
						rasistisia, pornografisia, ihmisarvoa tai yksityisyyden
						suojaa loukkaavia ilmauksia, kirjoituksia tai esityksiä.
						Käyttäjä vastaa siitä, että hänellä on kaikkeen
						jakamaansa materiaaliin tarvittavat tekijänoikeudet
						ja/tai oikeudenhaltijoiden suostumukset. Käyttäjä
						sitoutuu olemaan jakamatta Sovelluksen kautta aineistoa,
						jonka jakamiseen Käyttäjällä ei ole oikeutta sekä muuta
						aineistoa tai viestejä, joka on Palveluntarjoajaa,
						toista käyttäjää tai kolmatta osapuolta loukkaavaa tai
						syrjivää, rikolliseen toimintaan liittyvää tai lain sekä
						hyvän tavan vastaista. Käyttäjä vastaa kaikista edellä
						mainitulla tavalla aiheuttamistaan vahingoista
						täysimittaisesti. Käyttäjä vastaa kaikista Sovelluksen
						käytöstä Käyttäjälle aiheutuvista välittömistä ja
						välillisistä kuluista.
					</p>
					<p>
						Mikäli Käyttäjä rikkoo näitä käyttöehtoja,
						Palveluntarjoajalla on oikeus sulkea tai jäädyttää
						käyttäjätili välittömästi. Palveluntarjoaja ilmoittaa
						kaikista Käyttäjän lainvastaisista toimista
						Sovelluksessa toimivaltaiselle viranomaiselle.
					</p>
					<p>
						<b>Käyttäjätiedot</b>
					</p>

					<p>
						Sovelluksen käyttö edellyttää rekisteröitymistä.
						Käyttäjän tulee antaa rekisteröitymisen yhteydessä
						Palveluntarjoajan pyytämät tiedot oikeansisältöisenä.
						Käyttäjä sitoutuu ilmoittamaan Sovelluksen pyytämät
						henkilötiedot oikein ja rekisteröimään käyttäjän
						ainoastaan omia henkilötietoja käyttäen.
						Palveluntarjoaja varaa itselleen oikeuden jäädyttää tai
						poistaa käyttäjän, mikäli Palveluntarjoajan on syytä
						epäillä käyttäjätietojen loukkaavan käyttöehtoja.
						Palveluntarjoaja voi myös edellyttää Käyttäjää
						tunnistautumaan Sovelluksen käytön jatkamiseksi.
					</p>
					<p>
						Käyttäjä saa rekisteröitymisen yhteydessä Sovelluksen
						käyttöön tarkoitetun salasanan sekä käyttäjätunnuksen
						(Käyttäjän vahvistama sähköpostiosoite), joita
						käyttämällä Käyttäjä voi kirjautua Sovellukseen.
						Sovelluksen käyttäjätunnus ja salasana ovat
						henkilökohtaisia, eikä niitä saa luovuttaa kolmannelle
						osapuolelle. Mikäli salasana tai käyttäjätunnus päätyy
						muulla tavoin kolmannen osapuolen tietoon, Käyttäjän
						tulee ilmoittaa tästä välittömästi Palveluntarjoajan
						tukeen support@ticketless.fi . Käyttäjä on vastuussa
						kaikesta luomallaan käyttäjätunnuksella ja salasanalla
						tapahtuneesta Sovelluksen käytöstä. Käyttäjällä voi olla
						ainoastaan yksi käyttäjätili Sovelluksessa.
					</p>
					<p>
						<b>Sovelluksessa julkaistavat myynti-ilmoitukset</b>
					</p>
					<p>
						Sovellukseen rekisteröitynyt Käyttäjä voi luoda
						Sovellukseen myynti-ilmoituksia omassa määräysvallassaan
						olevasta omaisuudestaan. Käyttäjä vastaa
						myynti-ilmoituksessaan antamiensa tietojen
						oikeellisuudesta sekä on rikos- ja
						vahingonkorvausoikeudellisessa vastuussa toisen
						käyttäjän tai kolmannen osapuolen kanssa solmimistaan
						kaupoista. Käyttäjällä ei ole oikeutta harjoittaa
						Sovelluksessa ammattimaista kaupankäyntiä.
					</p>
					<p>
						Palveluntarjoaja pidättää oikeuden poistaa
						käyttöehtojen, lain tai hyvän tavan vastaiset
						myynti-ilmoitukset Sovelluksesta. Vastaavasti
						Palveluntarjoaja pidättää oikeuden poistaa tai jäädyttää
						oman harkintansa mukaan Käyttäjän, jonka toiminnassa on
						syytä epäillä oikeudellisia epäselvyyksiä sekä luovuttaa
						käyttäjä- tai tunnistetietoja toimivaltaiselle
						viranomaiselle (Poliisi, Verohallinto), jos on syytä
						epäillä, että on tapahtunut rikos, jonka selvittämistä
						tietojen luovuttaminen edistää.
					</p>
					<p>
						<b>Aineettomat oikeudet</b>
					</p>
					<p>
						Palveluntarjoaja omistaa kaikki Sovellukseen liittyvät
						aineettomat oikeudet. Näihin aineettomiin oikeuksiin
						kuuluu kaikki Sovelluksen sisältämä materiaali sekä
						siihen liittyvät tavaramerkit, tekijänoikeudet sekä muut
						aineettomat oikeudet liittyen teksteihin,
						ohjelmistoihin, malleihin, muotoiluihin, sekä kaikkeen
						muuhun materiaaliin, joka on Sovelluksessa. Käyttäjällä
						ei ole oikeuksia mihinkään Palveluntarjoajan edellä
						mainitsemaan aineettomaan omaisuuteen.
					</p>
					<p>
						Julkaisemalla myynti-ilmoituksia tai muuta sisältöä
						Sovelluksessa Käyttäjä myöntää Palveluntarjoajalle ilman
						erillistä korvausta rajoittamattoman oikeuden hyödyntää
						Käyttäjän Sovelluksessa julkaisemaa materiaalia.
						Palveluntarjoajalla on oikeus jakaa Käyttäjän
						julkaisemaa sisältöä omissa kanavissaan sekä käyttää
						sitä markkinoinnissaan. Palveluntarjoaja voi näin
						toimiessaan tallentaa, kopioida, siirtää ja muokata
						Käyttäjän julkaisemaa sisältöä. Käyttäessään Käyttäjän
						julkaisemaa sisältöä Palveluntarjoaja sitoutuu
						poistamaan sisällöstä sellaiset henkilötiedot, josta
						Käyttäjä voitaisiin tunnistaa (anonymisointi).
					</p>
					<p>
						<b>Palveluntarjoajan vastuunrajoitus</b>
					</p>
					<p>
						Palveluntarjoaja tarjoaa Sovelluksen sekä siinä
						julkaistavan sisällön käyttöön ilman mitään vastuita.
						Käyttäjä käyttää Sovellusta omalla vastuullaan.
					</p>
					<p>
						Palveluntarjoaja ei vastaa Sovelluksen käyttöön
						liittyvistä tietoturvariskeistä tai Sovelluksen sisällön
						oikeellisuudesta. Palveluntarjoaja ei vastaa myöskään
						mistään välittömistä tai välillisistä vahingoista, joita
						Käyttäjille tai kolmansille osapuolille aiheutuu
						Sovelluksen käyttämisestä, Käyttäjän poistamisesta,
						Sovelluksen käytön virheistä, puutteista tai
						viivästyksistä, Sovelluksen kautta saatavilla olevista
						ilmoituksista taikka mistään muusta välittömistä tai
						välillisistä vahingoista, jotka aiheutuvat Sovellusen
						käytöstä.
					</p>
					<p>
						Käyttäjä on velvollinen korvaamaan täysimääräisenä
						Palveluntarjoajalle tai kolmansille osapuolille
						aiheutuneen vahingon, joka on seurausta Käyttäjän
						käyttöehtojen, lain tai viranomaismääräysten
						laiminlyönnistä.
					</p>
					<p>
						<b>Henkilötietojen käsittely ja evästeet</b>
					</p>
					<p>
						Palveluntarjoaja käsittelee Käyttäjien henkilötietoja
						Palveluntarjoajan tietosuojaselosteen sekä tietosuojaa
						koskevan lainsäädännön mukaisesti. Palveluissa käytetään
						evästeitä tietosuojaselosteessa kuvatulla tavalla
					</p>
					<p>
						<b>Käyttöehtojen muuttaminent</b>
					</p>
					<p>
						Palveluntarjoaja pidättää itselleen oikeuden muuttaa
						käyttöehtoja Käyttäjää kuulematta. Palveluntarjoaja
						sitoutuu ilmoittamaan olennaisista käyttöehtojen
						muutoksista Sovelluksessa viimeistään 14 päivää ennen
						muutosten astumista voimaan. Mikäli Käyttäjä ei hyväksy
						käyttöehtojen muutoksia, Käyttäjällä on oikeus luopua
						Sovelluksen käytöstä. Käyttäjän katsotaan hyväksyneen
						muutokset, mikäli Käyttäjä jatkaa Sovelluksen
						käyttämistä muutosten voimaantulon jälkeen.
					</p>
					<p>
						<b>Sovellettava laki ja erimielisyyksien ratkaisu</b>
					</p>
					<p>
						Näihin käyttöehtoihin sekä niiden tulkintaan sovelletaan
						Suomen lakia lukuun ottamatta sen lainvalintaa koskevia
						säännöksiä. Palveluntarjoajan ja Käyttäjän väliset
						erimielisyydet pyritään ratkaisemaan ensisijaisesti
						osapuolten välisellä keskustelulla. Palveluntarjoajan ja
						Käyttäjän väliset riidat ratkaistaan Suomen yleisissä
						tuomioistuimissa.
					</p>
					<p>
						<b>Käyttöehtojen voimassaoloaika ja yhteystiedot</b>
					</p>
					<p>
						Käyttöehdot tulevat voimaan 13.4.2023 alkaen ja ne ovat
						voimassa toistaiseksi. Käyttäjä voi esittää käyttöehtoja
						koskevia kysymyksiä sekä antaa Sovellusta koskevaa
						palautetta Palveluntarjoajalle sähköpostitse
						osoitteeseen{' '}
						<a href="mailto:support@ticketless.fi">
							support@ticketless.fi
						</a>
					</p>
				</div>
			) : (
				<div className="p-3 h-100 d-flex flex-column overflow-auto">
					<h3>{t('profile.ticketlessTerms')}</h3>

					<p>{t('profile.termsDescription')}</p>
					<p>
						By using the Application, you agree to these terms of
						use. If the User does not accept these terms of use, the
						User must immediately cease using the Application and
						not share any content or information in the Application.
					</p>
					<p>
						<b>Service Provider's rights and obligations</b>
					</p>
					<p>
						Ticketless Oy (hereinafter referred to as the "Service
						Provider") has the right to decide on the provision or
						termination of the Application. The Service Provider has
						the right to improve and change the content of the
						Application as well as the terms of use in all respects
						at its sole discretion. The Service Provider shall
						notify the User of significant changes to the
						Application content and terms of use in the manner it
						deems best.
					</p>
					<p>
						The Service Provider has the right to remove from its
						Application any content that the Service Provider has
						prohibited, that other Users find offensive, or that the
						Service Provider deems illegal or contrary to good
						morals or otherwise inappropriate. In addition, the
						Service Provider has the right to remove users who add
						such content to the Application. The Service Provider is
						not obliged to notify the User of the removal of
						material due to the reasons mentioned above.
					</p>
					<p>
						The Service Provider is not responsible for any harm or
						damage caused by communication between Users or to third
						parties.
					</p>
					<p>
						<b>User's rights and obligations</b>
					</p>
					<p>
						By accepting these terms of use, the User is granted the
						right to use the Application in accordance with the
						terms of use. The User agrees to use the Application in
						a manner that complies with the terms of use, laws, and
						good practice.
					</p>
					<p>
						The User may not add material that violates applicable
						law or good practice to the Application. Such material
						includes, among other things, material containing
						racist, pornographic, degrading, or privacy-violating
						expressions, writings, or presentations. The User is
						responsible for ensuring that they have the necessary
						copyrights and/or rights holders' consent for all
						material they share. The User agrees not to share
						material through the Application to which the User has
						no right to share, and other material or messages that
						are offensive or discriminatory towards the Service
						Provider, another user, or a third party, related to
						criminal activity, or in violation of law or good
						practice. The User is fully liable for any damages
						caused by the User's actions in the manner described
						above. The User is responsible for all direct and
						indirect costs resulting from the User's use of the
						Application.
					</p>
					<p>
						If the User violates these terms of use, the Service
						Provider has the right to immediately close or freeze
						the User's account. The Service Provider will report all
						unlawful actions by the User in the Application to the
						competent authorities.
					</p>
					<p>
						<b>User information</b>
					</p>

					<p>
						Using the application requires registration. When
						registering, the User must provide the information
						requested by the Service Provider accurately. The User
						agrees to provide the personal information requested by
						the application accurately and to register the User
						using only their own personal information. The Service
						Provider reserves the right to freeze or delete a User
						if there is reason to suspect that the User information
						violates the terms of use. The Service Provider may also
						require the User to authenticate themselves to continue
						using the Application.
					</p>
					<p>
						Upon registration, the User will receive a password and
						a username (the User's verified email address) for use
						in accessing the application. The application username
						and password are personal and may not be shared with
						third parties. If the password or username becomes known
						to a third party in any other way, the User must
						immediately notify the Service Provider's support at
						support@ticketless.fi. The User is responsible for all
						use of the application that occurs using their created
						username and password. Users can only have one User
						account in the Application.
					</p>
					<p>
						<b>Listings to be published in the application</b>
					</p>
					<p>
						A registered User of the application can create listings
						for property under their control in the application. The
						User is responsible for the accuracy of the information
						provided in the listing and is legally and financially
						liable for any transactions entered into with another
						User or third party. The User does not have the right to
						engage in professional trading in the application.
					</p>
					<p>
						The Service Provider reserves the right to remove
						listings from the application that violate the terms of
						use, law, or good practice. Similarly, the Application
						provider reserves the right to remove or freeze a User,
						at its own discretion, whose actions raise suspicions of
						legal ambiguity and to disclose User or identification
						information to the competent authority (Police, Tax
						Administration) if there is reason to suspect that a
						crime has occurred and that the disclosure of
						information will promote its investigation.
					</p>
					<p>
						<b>Intellectual Property Rights</b>
					</p>
					<p>
						The Service Provider owns all intellectual property
						rights related to the Application. These intellectual
						property rights include all material contained in the
						Application, as well as trademarks, copyrights, and
						other intellectual property rights related to texts,
						software, models, designs, and all other materials that
						are in the Application. The User has no rights to any of
						the Service Provider's aforementioned intellectual
						property.
					</p>
					<p>
						By publishing listings or other content in the
						Application, the User grants the Service Provider an
						unlimited right to use the material published by the
						User in the Application without separate compensation.
						The Service Provider has the right to share the User's
						published content in its own channels and use it in its
						marketing. When doing so, the Service Provider may
						store, copy, transfer, and modify the User's published
						content. When using the User's published content, the
						Service Provider is committed to removing any personal
						information that could identify the User
						(anonymization).
					</p>
					<p>
						<b>Limitation of Liability of the Service Provider</b>
					</p>
					<p>
						The Service Provider provides the Application and the
						content published therein without any liabilities. The
						User uses the Application at their own risk.
					</p>
					<p>
						The Service Provider is not responsible for any security
						risks related to the use of the Application or the
						accuracy of its content. The Service Provider is not
						liable for any direct or indirect damages suffered by
						Users or third parties resulting from the use of the
						Application, the User's removal, errors, deficiencies or
						delays in the use of the Application, notifications
						available through the Application or any other direct or
						indirect damages arising from the use of the
						Application.
					</p>
					<p>
						The User is obliged to fully compensate the Application
						provider or third parties for any damages resulting from
						the User's breach of the terms of use, laws or
						regulations. Processing of Personal Data and Cookies
					</p>
					<p>
						<b>Processing of Personal Data and Cookies</b>
					</p>
					<p>
						The Service Provider processes Users' personal data in
						accordance with the Service Provider's Privacy Policy
						and applicable data protection laws. Cookies are used in
						the Application in the manner described in the Privacy
						Policy.
					</p>
					<p>
						<b>The amendment of terms of use</b>
					</p>
					<p>
						The Service Provider reserves the right to change the
						terms of use without consulting the User. The Service
						Provider undertakes to notify Users of any significant
						changes to the terms of use in the application at least
						14 days before the changes come into effect. If the User
						does not accept the changes to the terms of use, the
						User has the right to discontinue use of the
						application. The User is considered to have accepted the
						changes if the User continues to use the application
						after the changes come into effect.
					</p>
					<p>
						<b>Applicable law and dispute resolution</b>
					</p>
					<p>
						These terms of use and their interpretation are governed
						by the laws of Finland, except for its choice of law
						rules. Any disputes between the Service Provider and the
						User shall be primarily resolved through discussions
						between the parties. Disputes between the Service
						Provider and the User shall be resolved in the general
						courts of Finland.
					</p>
					<p>
						<b>Terms of use validity period and chat information</b>
					</p>
					<p>
						These terms and conditions come into effect on
						13.04.2023 and are valid until further notice. The User
						can ask questions about the terms and conditions and
						provide feedback about the application to the Service
						Provider via email at support@ticketless.fi.{' '}
						<a href="mailto:support@ticketless.fi">
							support@ticketless.fi
						</a>
					</p>
				</div>
			)}
		</>
	);
};

const TermsPage = (): JSX.Element => {
	const { t } = useTranslation();
	return (
		<View topBarProps={{ header: t('general.terms_and_conditions') }}>
			<TermsContent />
		</View>
	);
};

export { TermsContent, TermsPage };
