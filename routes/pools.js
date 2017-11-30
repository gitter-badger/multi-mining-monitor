/*
Copyright (C) 2017 OpenSourceCryptoTools

This file is part of multi-mining-monitor.

multi-mining-monitor is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

multi-mining-monitor is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with multi-mining-monitor.  If not, see <http://www.gnu.org/licenses/>.
*/
const poolClientMap = require('../lib/pool-clients');
const router = require('express').Router();

/*
 * Route parameters
 */
router.param('coin', (req, res, next, coin) => {
	if (!req.poolClient.getSupportedCoins().includes(coin)) {
		res.status(404).end();
	} else {
		next();
	}
});

router.param('pool', (req, res, next, pool) => {
	if (!poolClientMap.hasOwnProperty(pool)) {
		res.status(404).end();
	} else {
		req.poolClient = poolClientMap[pool];

		next();
	}
});

/*
 * Routes
 */
//Get list of available pools
router.get('/', (req, res) => {
	res.json({pools: Object.keys(poolClientMap)});
});

//Get list of available coins for pool
router.get('/:pool', (req, res) => {
	res.json({coins: req.poolClient.getSupportedCoins()});
});

//Get stats for coin for pool
router.get('/:pool/:coin', (req, res) => {
	res.json({
		averageBlockInterval: 60*5,				//Measured in seconds
		feePercent: 1,							//1 = 1%, 10 = 10%, etc
		hashRate: 3500700900,					//Need to communicate units of measurement somewhere
		lastBlockFoundTimestamp: (new Date()).getTime(),	//UTC timestamp
		minerCount: 1500
	});
});

//Get stats for miner
router.get('/:pool/:coin/miners/:address', (req, res) => {
	res.json({
		hashRate: 2342342,				//Need to communicate units of measurement somewhere
		lastShareSubmittedTimestamp: (new Date()).getTime(),	//UTC timestamp
		pendingBalance: 0.0123456789,	//Need to communicate units of measurement somewhere
		totalPaid: 100					//Need to communicate units of measurement somewhere
	});
});

//Get payment history for miner
router.get('/:pool/:coin/miners/:address/payments', (req, res) => {
	res.json({
		payments: [
			{
				amount: 0.05245667,					//Need to communicate units of measurement somewhere
				timestamp: (new Date()).getTime(),	//UTC timestamp
				transactionId: '0x4f1744ce5c8948006c77a89002a23e4b019cecfa8a0876d49771cedfd909a501'
			},
			{
				amount: 0.05778983,					//Need to communicate units of measurement somewhere
				timestamp: (new Date()).getTime(),	//UTC timestamp
				transactionId: '0x4f1744ce5c8948006c77a89002a2345346456456456876d49771cedfd909a502'
			},
			{
				amount: 0.05456743,					//Need to communicate units of measurement somewhere
				timestamp: (new Date()).getTime(),	//UTC timestamp
				transactionId: '0x23425345452134422c77a89002a23e4b019cecfa8a0876d49771cedfd909a503'
			}
		]
	});
});

//Get stats for workers for miner
router.get('/:pool/:coin/miners/:address/workers', (req, res) => {
	res.json({
		workers: [
			{
				hashRate: 1111456,									//Need to communicate units of measurement somewhere
				id: 'rig00',
				lastShareSubmittedTimestamp: (new Date()).getTime()	//UTC timestamp
			},
			{
				hashRate: 1111567,									//Need to communicate units of measurement somewhere
				id: 'rig01',
				lastShareSubmittedTimestamp: (new Date()).getTime()	//UTC timestamp
			},
			{
				hashRate: 1111678,									//Need to communicate units of measurement somewhere
				id: 'rig02',
				lastShareSubmittedTimestamp: (new Date()).getTime()	//UTC timestamp
			}
		]
	});
});

module.exports = router;