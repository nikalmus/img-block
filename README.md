### what this app does:

<p>
        In the context of this app, mining involves trying different nonce values until one is found that, when combined with <br />
        Exif data of the image and the previous block's hash,  creates a hash with two leading zeros. <br />
        These elements are concatenated into a single string, which is then fed into a cryptographic hashing function SHA-256. <br />
        To start the blockchain, drag and drop the first image and click on 'Mine.' <br />
        When Hash is produced, Prev Hash of the next block is automatically set.
    </p>

![Alt text](/src/img/help1.png "screenshot 1")

<p>You can follow the same process for the other images.<br />
    Because the hash function is deterministic, any modification to the Exif data, <br />
    previous block's hash, or nonce would produce a completely different hash value. <br />
    The remaining steps show that if a bad actor alters a past transaction, all subsequent blocks must be re-hashed.<br />
    To experiment with Bad Actor mode, click on the 'Bad Actor' button.
    </p>

![Alt text](/src/img/help2.png "screenshot  2")

<p>An alrtered image of Vermeer's "Astronomer" appears in the image repository<br />
    In Bad Actor mode you can drag and drop an image onto a previously hashed block. <br />
    This will effe
    ctively change the exif data.
    </p>
    
![Alt text](/src/img/help3.png "screenshot  3")

<p>At this point a new Hash must be found.</p>

![Alt text](/src/img/help4.png "screenshot  4")

<p>If the altered block is rehashed, Prev Hash of the next block will no longer match the Hash of altered block.</p>

![Alt text](/src/img/help5.png "screenshot  5")

<p>The process is intentionally cumbersome. <br />
    After clicking the "Mine" button, use the copy icon to save the new Hash to the clipboard. <br />
    Then click on the Prev Hash of the next block.</p>

![Alt text](/src/img/help6.png "screenshot  6")

<p>Paste the new Hash of the previous block from the clipboard,<br />
    click "Done", and click on "Mine" button to re-hash the current block.<br />
    A bad actor would have to repeat these steps for all subsequent blocks.</p>

![Alt text](/src/img/help7.png "screenshot  7")