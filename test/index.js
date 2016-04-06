var Code = require('code')
var Mocha = require('mocha')
var describe = Mocha.describe
var expect = Code.expect
var thetv = require('../')
var show = require('../src/show')

describe('TV show matcher', () => {

    it('should have loaded the library correctly', (done) => {

        expect(thetv).to.be.function()
        done()
    })

    it('should be an object', (done) => {

        var obj = thetv("abc.S07E01.fdsa.720p.HDTV.x264-DHD")
        expect(obj).to.be.object()
        done()
    });

    [
        "abc.S07E01.fdsa.720p.HDTV.x264-DHD",
        "fdas.abcds.fdsa.S07E02",
        "aFDDSAFAasdf.fdsa.S07E03-DHD"
    ].forEach((show) => {
        it(`should return a correct object for ${show}`, (done) => {

            var obj = thetv(show)
            expect(obj.name).to.exist()
            expect(obj.season.name).to.equal('07')
            expect(Number(obj.episode.number)).to.be.above(0)
            done()
        })
    });

    [
        "avc.5x01.fdsa.720p.HDTV.x264-DHD",
        "fdsa.fdsaa.fdas.5x03.720p"
    ].forEach((show) => {

        it(`should return a correct object for ${show}`, (done) => {

            var obj = thetv(show)
            expect(obj.name).to.exist()
            expect(obj.season.name).to.equal('05')
            expect(Number(obj.episode.number)).to.be.above(0)
            done()
        })
    });

    [
        "avc.S01E02.fdsa.720p.HDTV.x264-DHD",
        "fdsa.fdsaa.fdas.5x03.720p"
    ].forEach((show) => {

        it(`should be a tv show for ${show}`, (done) => {

            var obj = thetv(show)
            expect(obj.tv).to.equal(true)
            done()
        })
    });

    [
        "Sony Acid Pro v7 0 0 502 REPACK-NoPE",
        "[REQ] Lady Snowblood I-II 1080p BluRay x264",
        "A Perfect Day 2015 1080p BluRay X264-AMIABLE"
    ].forEach((show) => {

        it(`should not be a tv show for ${show}`, (done) => {

            var obj = thetv(show)
            expect(obj.tv).to.equal(false)
            done()
        })
    })

    it('should set the correct information for abc.S07E01.fdsa.720p.HDTV.x264-DHD', (done) => {

        var obj = thetv("abc.S07E01.fdsa.720p.HDTV.x264-DHD")
        expect(obj.tv).to.equal(true)
        expect(obj.name).to.equal('abc')
        expect(obj.season.name).to.equal('07')
        expect(obj.episode.name).to.equal('01')
        expect(obj.season.number).to.equal(7)
        expect(obj.episode.number).to.equal(1)
        done()
    })

    it('should replace .\'s with spaces in name', (done) => {

        var obj = thetv("fdsa.fdsaa.fdas.5x03.720p")
        expect(obj.name).to.not.contain('.')
        expect(obj.name).to.contain(' ')
        done()
    })
})
