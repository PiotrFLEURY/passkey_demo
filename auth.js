
function generateChallenge() {
    // random 20 char string

    let challenge = "12345678901234567890";

    // string to arraybuffer
    let challengeBuffer = new TextEncoder("utf-8").encode(challenge);

    return challengeBuffer;
}

function register() {
    if (window.PublicKeyCredential) {

        options = {
            publicKey: {
                rp: {
                    id: "localhost",
                    name: "Biometric auth demo"
                },
                user: {
                    id: new TextEncoder("utf-8").encode("1234"),
                    name: "developer@example.com",
                    displayName: "Developer"
                },
                challenge: generateChallenge(),
                // This Relying Party will accept either an ES256 or RS256 credential, but
                // prefers an ES256 credential.
                pubKeyCredParams: [
                    {
                        type: "public-key",
                        alg: -7 // "ES256" as registered in the IANA COSE Algorithms registry
                    },
                    {
                        type: "public-key",
                        alg: -257 // Value registered by this specification for "RS256"
                    }
                ],
                authenticatorSelection: {
                    // Try to use UV if possible. This is also the default.
                    userVerification: "preferred"
                }
            }
        }

        navigator.credentials.create(options)
            .then(function (cred) {
                // should be an object like this
                //
                //  response: {
                //    clientDataJSON: { 
                //      type: “webauthn.create”,
                //      challenge: ... // should match initial challenge
                //      origin: ... //
                //    },
                //    attestationObject: {
                //      authData: {
                //        attestedCredentialData: {
                //          credentialId: ..., 
                //          credentialPublicKey: ...,
                //        }
                //      }, // other stuff about attestation 
                //    }
                //  }
                //}

                // check challenge
                //if (cred.response.clientDataJSON.challenge !== options.publicKey.challenge) {
                //    console.log("Challenge mismatch");
                //    return;
                //}

                globalCredential = cred;

                if (cred.response.attestationObject.authData.attestedCredentialData.credentialId) {
                    // successful registration
                    console.log("Registration successful");
                    credentialData = cred.response.attestationObject.authData.attestedCredentialData;

                    console.log('credentialId: ' + credentialData.credentialId);
                    console.log('credentialPublicKey: ' + credentialData.credentialPublicKey);

                    document.getElementById('credentialId').value = credentialData.credentialId;
                    document.getElementById('credentialPublicKey').value = credentialData.credentialPublicKey;
                    // TODO: send credentialId and credentialPublicKey to server
                }
            })
            .catch(function (err) {
                console.log(err);
            });


    } else {
        console.log("WebAuthn not supported");
    }
}

function auth() {
    if (window.PublicKeyCredential) {
        let credentialId = document.getElementById('credentialId').value;
        let credentialPublicKey = document.getElementById('credentialPublicKey').value;

        options = {
            publicKey: {
                rpId: "localhost",
                challenge: generateChallenge(),
                userVerification: "preferred",
                allowCredentials: [{ type: "public-key", id: credentialId }]
                //...
            }
        }

        navigator.credentials.get(options)
            .then((cred) => {
                // should be an object like this

                //{
                //    authenticatorData: {
                //      rpIdHash : ..., // hash of the requesting party Id
                //      flags : ..., // bit array including authentication results
                //      // other info
                //    },
                //    clientDataJSON: {
                //      type: "webauthn.get",
                //      challenge: ... // should match initial challenge
                //    }
                //  }

                // check challenge and type
                if (cred.response.clientDataJSON.challenge !== options.publicKey.challenge) {
                    console.log("Challenge mismatch");
                    return;
                }

                if (cred.response.clientDataJSON.type !== "webauthn.get") {
                    console.log("Type mismatch");
                    return;
                }

                // check rpIdHash
                let rpIdHash = cred.response.authenticatorData.rpIdHash;
                let rpIdHashExpected = sha256(options.publicKey.rpId);
                if (rpIdHash !== rpIdHashExpected) {
                    console.log("rpIdHash mismatch");
                    return;
                }

                // check flags
                let flags = cred.response.authenticatorData.flags;
                if (flags & 0x02) {
                    // user verified
                    console.log("User verified");
                } else if (flags & 0x00) {
                    // user present
                    console.log("User present");
                }

                document.getElementById('result').value = "Success";

            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        console.log("WebAuthn not supported");
    }
}