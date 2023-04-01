# Passkey demo

This is a demo of biometric authentication using the [WebAuthn API](https://www.w3.org/TR/webauthn-2/).

# Purpose

This demo try to implement the `passkey` specification from the [Fido Aliance](https://fidoalliance.org/).

# Motivation

The goal of this demo is to show how to implement biometric authentication using the WebAuthn API in order to authenticate a user on a website **__without any password__**.

# Global principles

## Passkey

The passkey is a credential that can be used to authenticate a user on a website. It is a credential that is stored on the user's device and can be used to authenticate the user on the website.

## Biometric authentication

Biometric authentication is a way to authenticate a user using a biometric characteristic of the user. It can be a fingerprint, a face, a voice, etc.

# How to run

Just start the index.html file using `live-server` or any other server.

# Links

## WebAuthn

* [WebAuthn API](https://www.w3.org/TR/webauthn-2/)
* [WebAuthn API on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API)
* [WebAuthn API on caniuse](https://caniuse.com/#feat=webauthn)

## Passkey

* [Web.dev passkey blog post](https://web.dev/passkey-registration/)
* [Google passkey documentation](https://developers.google.com/identity/passkeys?hl=fr)
* [Apple passkey documentation](https://developer.apple.com/passkeys/)

## Fido Aliance for passkey specification

* [fidoaliance](https://fidoalliance.org/passkeys/)

## Blog posts on passkey

* [Auth0 blog passkey post](https://auth0.com/blog/our-take-on-passkeys/)
* [Stackoverflow blog](https://stackoverflow.blog/2022/11/16/biometric-authentication-for-web-devs/)

## Implementation APIs

* [Web PublicKeyCredential API](https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredential)
* [native Apple Touch ID](https://developer.apple.com/documentation/localauthentication/accessing_keychain_items_with_face_id_or_touch_id)
* [native Android Fingerprint](https://developer.android.com/training/sign-in/biometric-auth)