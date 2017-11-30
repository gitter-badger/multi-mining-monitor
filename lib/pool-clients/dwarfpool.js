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
const PoolClientBase = require('./pool-client-base');

class DwarfpoolClient extends PoolClientBase {
	constructor() {
		super('http://dwarfpool.com/', 'ETH', 'XMR');
	}
}

module.exports = new DwarfpoolClient();