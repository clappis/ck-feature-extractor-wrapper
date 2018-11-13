# Feature Extractor Wrapper!

This project has a dependency to [CK Project](https://github.com/ctuning/ck). The previous CK's installation is expected to run this module.

Extraction
=============
#### The extraction is on program level, in other words, this wrapper summarizes the features from each program's function.


By default, you can extract all cbench static program features as follow:
```
node index.js
```
Also, you can extract features from another program of CK:
```
programs=cbench-consumer-tiff2dither,cbench-security-sha node index.js
```
The list of supported programs can be found on:
```
ck list program.static.features
```
Tip: You can extract the features and open the result on a csv editor, just throw the result inside a file.

A return example can be found in the file example.csv