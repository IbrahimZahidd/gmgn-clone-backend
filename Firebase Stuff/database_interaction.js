// var admin = require('firebase-admin');
// var serviceAccount = require('./gmgn-clone-database-firebase-adminsdk-lqfu4-1836c48628.json');

// // Initialize Firebase Admin SDK
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://gmgn-clone-database-default-rtdb.firebaseio.com',
// });

// // Get a reference to the Firebase Realtime Database
// const db = admin.database();

// // Function to write coin data to Firebase Realtime Database
// async function writeCoinData(coinName, coinData) {
//   try {
//     const coinRef = db.ref('trending/' + coinName);
//     await coinRef.set(coinData);
//     console.log(`Data for ${coinName} written successfully`);
//   } catch (error) {
//     console.error('Error writing coin data:', error);
//   }
// }

// // Example data for Bitcoin
// const bitcoinData = {
//   id: 'bitcoin',
//   name: 'Bitcoin',
//   image: 'https://url-to-image.com/bitcoin.png',
//   current_price: 45000.0,
//   market_cap: 850000000000,
//   total_volume_24h: 35000000000,
//   price_change_percentage_1h: 0.5,
//   price_change_percentage_24h: 2.0,
//   price_change_percentage_7d: -1.5,
//   age: 105,
// };

// // Write Bitcoin data
// writeCoinData('Bitcoin', bitcoinData);

// // Example data for Ethereum
// const ethereumData = {
//   id: 'ethereum',
//   name: 'Ethereum',
//   image: 'https://url-to-image.com/ethereum.png',
//   current_price: 3000.0,
//   market_cap: 350000000000,
//   total_volume_24h: 20000000000,
//   price_change_percentage_1h: 0.1,
//   price_change_percentage_24h: 1.5,
//   price_change_percentage_7d: 3.0,
//   age: 105,
// };

// // Write Ethereum data
// writeCoinData('Ethereum', ethereumData);
