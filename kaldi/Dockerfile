FROM burin010n/kaldi

RUN cp /kaldi/src/online2bin/online2-tcp-nnet3-decode-faster /usr/bin
RUN cp -a /kaldi/tools/openfst/lib/libfst.so* /usr/lib/x86_64-linux-gnu
RUN rm -rf /kaldi

ENTRYPOINT ["/bin/bash","-c"]