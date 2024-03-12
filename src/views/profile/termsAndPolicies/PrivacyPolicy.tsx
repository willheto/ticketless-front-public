import React from 'react';
import { useTranslation } from 'react-i18next';
import View from '@src/components/layout/View';

const PrivacyPolicyContent = (): JSX.Element => {
	const { t, i18n } = useTranslation();
	return (
		<>
			{i18n.language === 'fi' ? (
				<div className="p-3 h-100 d-flex flex-column overflow-auto">
					<h3>{t('profile.privacyPolicyTicketless')} </h3>
					<p>{t('profile.privacyPolicyDescription')}</p>
					<p>
						<b>Rekisterinpitäjä</b>
					</p>
					<p>
						Ticketless Oy (myöhemmin ”rekisterinpitäjä”) Satamakatu
						17 A 40100 JYVÄSKYLÄ
					</p>
					<p>
						<b>Reskiteröinnistä vastaava yhteyshenkilö</b>
					</p>
					<p>Henri Willman, support@ticketless.fi</p>
					<p>
						<b>Rekisterin nimi</b>
					</p>
					<p>Sähköisen palvelun käyttäjärekisteri</p>
					<p>
						<b>
							Henkilötietojen kerääminen sähköisen palvelun
							käyttäjärekisteriin:{' '}
						</b>
					</p>
					<p>
						Rekisterinpitäjä noudattaa henkilötietojen keräämisessä
						ja käsittelyssä henkilötietolakia, tietosuoja-asetusta
						sekä muuta soveltuvaa lainsäädäntöä. Rekisterinpitäjä
						kerää henkilötietoja vasta hyväksyttyäsi henkilötietojen
						käsittelemisen rekisteröitymisen yhteydessä. Rekisteriin
						tallennettavia tietoja ovat: henkilön nimi,
						kotipaikkakunta, sähköpostiosoite, puhelinnumero,
						verkkoyhteyden IP-osoite, tiedot palvelussa myydyistä ja
						ostetuista lipuista sekä muut palvelun käyttöön
						liittyvät tiedot. Rekisteriin tallennettavat tiedot
						saadaan käyttäjältä rekisteröintilomakkeilta sekä
						myynti-ilmoituslomakkeelta.
					</p>
					<p>
						<b>Tietojen käytön tarkoitus: </b>
					</p>
					<p>
						Käytämme tietojasi parantaaksemme palvelumme
						käyttäjäkokemusta, tarjotaksemme sinulle tarvitsemiasi
						palveluita, tarjouksia sekä mainoksia. Verkkosivuston
						vierailijoiden IP-osoitteita ja palvelun toiminnoille
						välttämättömiä evästeitä käsitellään oikeutetun edun
						perusteella mm. tietoturvasta huolehtimiseksi ja
						sivuston vierailijoiden tilastotietojen keruuta varten
						niissä tapauksissa, kun niiden voidaan katsoa olevan
						henkilötietoja. Rekisterinpitäjä pyytää erikseen
						suostumusta kolmansien osapuolten evästeiden käyttöön.
						Rekisterinpitäjä ei luovuta henkilötietoja
						suoramarkkinointitarkoituksiin.
					</p>
					<p>
						<b>Tietojen säilyttäminen:</b>
					</p>
					<p>
						Säilytämme tietojasi niin kauan kuin palveluumme luotu
						käyttäjätili on aktiivinen ja niin kauan kuin se on
						tarpeellista palveluidemme tarjoamiseksi. Poistamme
						tietosi, kun niitä ei enää tarvita. Pidätämme oikeuden
						säilyttää käyttäjätietoja käyttäjätilin poistamisen
						jälkeen yhden (1) vuoden ajan mahdollisten
						väärinkäytösten selvittämiseksi.
					</p>
					<p>
						<b>Tietojen jakaminen:</b>
					</p>
					<p>
						Emme jaa tietojasi kolmansille osapuolille ilman
						suostumustasi. Tietoja voidaan siirtää rekisterinpitäjän
						toimesta myös EU- tai ETA-alueen ulkopuolelle, mikäli
						käyttäjä on antanut tähän suostumuksensa.
					</p>
					<p>
						<b>Rekisterin suojauksen periaatteet</b>
					</p>
					<p>
						Rekisterin käsittelyssä noudatetaan huolellisuutta ja
						tietojärjestelmien avulla käsiteltävät tiedot suojataan
						asianmukaisesti. Kun rekisteritietoja säilytetään
						internet-palvelimilla, niiden laitteiston fyysisestä ja
						digitaalisesta tietoturvasta huolehditaan
						asiaankuuluvasti. Rekisterinpitäjä huolehtii siitä, että
						tallennettuja tietoja sekä palvelimien käyttöoikeuksia
						ja muita henkilötietojen turvallisuuden kannalta
						kriittisiä tietoja käsitellään luottamuksellisesti ja
						vain niiden työntekijöiden toimesta, joiden työnkuvaan
						se kuuluu.
					</p>
					<p>
						<b>
							Tarkastusoikeus ja oikeus vaatia tiedon korjaamista
						</b>
					</p>
					<p>
						Jokaisella rekisterissä olevalla henkilöllä on oikeus
						tarkistaa rekisteriin tallennetut tietonsa ja vaatia
						mahdollisen virheellisen tiedon korjaamista tai
						puutteellisen tiedon täydentämistä. Mikäli henkilö
						haluaa tarkistaa hänestä tallennetut tiedot tai vaatia
						niihin oikaisua, pyyntö tulee lähettää kirjallisesti
						rekisterinpitäjälle. Rekisterinpitäjä voi pyytää
						tarvittaessa pyynnön esittäjää todistamaan
						henkilöllisyytensä. Rekisterinpitäjä vastaa asiakkaalle
						EU:n tietosuoja-asetuksessa säädetyssä ajassa
						(pääsääntöisesti kuukauden kuluessa).
					</p>
					<p>
						<b>
							Muut henkilötietojen käsittelyyn liittyvät oikeudet
						</b>
					</p>
					<p>
						Rekisterissä olevalla henkilöllä on oikeus pyytää häntä
						koskevien henkilötietojen poistamiseen rekisteristä
						(”oikeus tulla unohdetuksi”). Niin ikään rekisteröidyllä
						on muut EU:n yleisen tietosuoja-asetuksen mukaiset
						oikeudet kuten henkilötietojen käsittelyn rajoittaminen
						tietyissä tilanteissa. Näihin oikeuksiin liittyvät
						pyynnöt tulee lähettää kirjallisesti
						rekisterinpitäjälle. Rekisterinpitäjä voi pyytää
						tarvittaessa pyynnön esittäjää todistamaan
						henkilöllisyytensä. Rekisterinpitäjä vastaa asiakkaalle
						EU:n tietosuoja-asetuksessa säädetyssä ajassa
						(pääsääntöisesti kuukauden kuluessa)
					</p>
					<p>
						<b>Evästeet</b>
					</p>
					<p>
						Evästeet ovat pieniä tekstitiedostoja, jotka
						tallennetaan tietokoneellesi tai mobiililaitteellesi.
						Rekisterinpitäjä käyttää evästeitä parantaakseen
						sovelluksen käyttäjäkokemusta muistamalla kirjautumisesi
						sovelluksessa sekä sivuston vierailijoiden tilastointiin
						saadakseen tietoja siitä, miten ja milloin Ticketless
						Oy:n verkkopalveluja käytetään. Tätä kerättyä tietoa
						käytetään Ticketless Oy:ssä tilastointiin,
						verkkopalvelun kehittämiseen sekä sisällön tuottamiseen.
						Kysymme aina käyttäjän suostumuksen
						tilastointievästeiden käyttöön.
					</p>
					<p>
						Rekisterinpitäjä ei ole vastuussa tietojesi
						väärinkäytöstä tai vuodosta, joka johtuu tietojen
						jakamisesta sinun puolestasi, tietomurrosta tai tietojen
						säilyttämisestä tai käsittelystä rekisterinpitäjän
						toimesta.
					</p>
					<p>
						Jos sinulla on kysyttävää tästä rekisteriselosteesta tai
						palvelumme tietojenkäsittelystä, ota meihin yhteyttä
						sähköpostitse osoitteeseen{' '}
						<a href="mailto:support@ticketless.fi">
							support@ticketless.fi
						</a>
					</p>
					<p>
						Tämä rekisteriseloste on voimassa toistaiseksi ja sitä
						voidaan muuttaa ilman ennakkoilmoitusta.
					</p>
				</div>
			) : (
				<div className="p-3 h-100 d-flex flex-column overflow-auto">
					<h3>{t('profile.privacyPolicyTicketless')} </h3>
					<p>{t('profile.privacyPolicyDescription')}</p>
					<p>
						<b>Data Controller</b>
					</p>
					<p>
						Ticketless Ltd. (hereafter "data controller") Satamakatu
						17 A 40100 JYVÄSKYLÄ
					</p>
					<p>
						<b>Person in charge of data controlling:</b>
					</p>
					<p>Henri Willman, support@ticketless.fi</p>
					<p>
						<b>Register name</b>
					</p>
					<p>User register for electronic service.</p>
					<p>
						<b>
							Collection of personal data into the electronic
							service user register:{' '}
						</b>
					</p>
					<p>
						The data controller complies with the Personal Data Act,
						the General Data Protection Regulation, and other
						applicable legislation in the collection and processing
						of personal data. The data controller collects personal
						data only after you have accepted the processing of
						personal data when registering. The information to be
						recorded in the register includes the person's name,
						place of residence, email address, phone number, network
						connection IP address, information about tickets sold
						and purchased through the service, and other information
						related to the use of the service. The information to be
						recorded in the register is obtained from the user
						through registration forms and sales announcement forms.
					</p>
					<p>
						<b>Purpose of using the data: </b>
					</p>
					<p>
						We use your information to improve our service user
						experience, to offer you the necessary services, offers,
						and advertisements. Visitor IP addresses and cookies
						necessary for the service functions on the website are
						processed on the basis of legitimate interest, among
						other things, to ensure data security and to collect
						visitor statistics when they can be considered personal
						data. The data controller requests separate consent for
						the use of third-party cookies. The data controller does
						not disclose personal data for direct marketing
						purposes.
					</p>
					<p>
						<b>Data retention: </b>
					</p>
					<p>
						We keep your information as long as your user account in
						our service is active and as long as it is necessary for
						providing our services. We delete your information when
						it is no longer needed. We reserve the right to retain
						user data for one (1) year after the deletion of the
						user account to investigate potential abuse.
					</p>
					<p>
						<b>Data sharing: </b>
					</p>
					<p>
						We do not share your information with third parties
						without your consent. The controller may also transfer
						data outside the EU or EEA if the user has given their
						consent for this.
					</p>
					<p>
						<b>The principles of register protection</b>
					</p>
					<p>
						Carefulness is observed in the processing of the
						register, and the information processed by means of
						information systems is protected appropriately. When
						register information is stored on Internet servers, the
						physical and digital security of the hardware is taken
						care of properly. The register holder ensures that the
						stored information as well as the use rights of the
						servers and other information critical to the security
						of personal data are handled confidentially and only by
						employees whose job description includes it.
					</p>
					<p>
						<b>
							Right of inspection and right to demand correction
							of information
						</b>
					</p>
					<p>
						Every person registered in the register has the right to
						check their information stored in the register and to
						demand correction of any incorrect or incomplete
						information. If a person wants to check their stored
						information or request a correction, the request must be
						sent in writing to the controller. The controller may
						request the requester to prove their identity if
						necessary. The controller will respond to the customer
						within the time specified in the EU data protection
						regulation (usually within one month).
					</p>
					<p>
						<b>
							Other rights related to the processing of personal
							data
						</b>
					</p>
					<p>
						A registered person has the right to request the removal
						of their personal data from the register ("right to be
						forgotten"). Similarly, the data subject has other
						rights under the EU General Data Protection Regulation,
						such as the right to restrict the processing of personal
						data in certain situations. Requests related to these
						rights must be sent in writing to the data controller.
						The data controller may, if necessary, ask the requester
						to prove their identity. The data controller will
						respond to the customer within the time frame provided
						for in the EU Data Protection Regulation (usually within
						one month).
					</p>
					<p>
						<b>Cookies</b>
					</p>
					<p>
						Cookies are small text files that are stored on your
						computer or mobile device. The controller uses cookies
						to improve the user experience of the application by
						remembering your login to the application, and for
						visitor statistics on Ticketless Oy's online services to
						obtain information on how and when the Ticketless Oy's
						online services are used. This collected information is
						used for statistics, online service development, and
						content production at Ticketless Oy. We always ask for
						the user's consent to use statistical cookies.
					</p>
					<p>
						The controller is not responsible for any misuse or
						disclosure of your information resulting from data
						sharing on your behalf, data breaches, or the storage or
						processing of data by the controller.
					</p>
					<p>
						If you have any questions about this privacy policy or
						our data processing practices, please chat us by email
						at support@ticketless.fi
						<a href="mailto:support@ticketless.fi">
							support@ticketless.fi
						</a>
					</p>
					<p>
						This privacy policy is valid indefinitely and may be
						amended without prior notice.
					</p>
				</div>
			)}
		</>
	);
};

const PrivacyPolicyPage = (): JSX.Element => {
	const { t } = useTranslation();
	return (
		<View topBarProps={{ header: t('profile.privacyPolicy') }}>
			<PrivacyPolicyContent />
		</View>
	);
};

export { PrivacyPolicyPage, PrivacyPolicyContent };
