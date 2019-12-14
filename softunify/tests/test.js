const Softunify = require('../03. Softunify_Ресурси.js');
const expect = require('chai').expect;
const assert = require('chai').assert;




describe('Test the class Softunify',function(){
   
    it('should test if allSongs is an object',function(){
       let myClass = new Softunify();
        assert.deepEqual(myClass.allSongs, {})
    })

    // it('test if downloadSong() works correctly',function(){
    //     let myClass = new Softunify();
    //   myClass.downloadSong('A','B','C');
    //     assert.equal(myClass.allSongs['A']==='rate: 0, votes: 0, songs: B - C}')
    // })

    it('is the song empty',function(){
        let myClass = new Softunify();
        assert.equal(myClass.playSong('song'),`You have not downloaded a song song yet. Use SoftUniFy's function downloadSong() to change that!`)
    })
})