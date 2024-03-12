class LocationsService {
	async getLocationData(location) {
		const response = await fetch(
			`https://eu1.locationiq.com/v1/reverse?key=pk.a3df32bb210342ae93f86f68f3a04a40&lat=${location.coords.latitude}&lon=${location.coords.longitude}&format=json`,
		);
		const data = await response.json();
		return data;
	}
}
const locations = new LocationsService();
export default locations;
