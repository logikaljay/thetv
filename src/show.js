class Show {

    constructor(input) {

        var regex = [
            /(.*).S(\d+)E(\d+)/,
            /(.+).(\d+\x\d+)/
        ]

        // match tv.show.S01E01
        if (input.match(regex[0]) != null) {
            var data = input.match(regex[0])
            this.name = data[1]
            this._season = data[2]
            this._episode = data[3]
        }

        // match tv.show.501
        else if (input.match(regex[1]) != null) {
            var data = input.match(regex[1])
            this.name = data[1]
            var seasonEpisode = data[2].split('x')

            this._season = seasonEpisode[0]
            this._episode = seasonEpisode[1]
        }

        if (this._season && this._episode) {
            this.tv = true
        }
        else {
            this.name = input
            this.tv = false
        }

        if (this.tv) {
            this.name = this.name.replace(/\./g, ' ')

            this.season = {
                number: this._season*1,
                name: Number(this._season) < 10 ? "0" + Number(this._season) : this._season
            }

            this.episode = {
                number: this._episode*1,
                name: Number(this._episode) < 10 ? "0" + Number(this._episode) : this._episode
            }
        }
    }
}

module.exports = Show
