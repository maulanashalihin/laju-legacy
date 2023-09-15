##LAJU

wrk -t12 -c400 -d30s http://localhost:3006

Running 30s test @ http://localhost:3006
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     2.04ms  486.96us  19.81ms   95.72%
    Req/Sec    16.24k     1.45k   21.21k    84.36%
  5820498 requests in 30.03s, 521.78MB read
  Socket errors: connect 0, read 372, write 0, timeout 0
Requests/sec: 193834.13
Transfer/sec:     17.38MB


##PURE NODEJS

wrk -t12 -c400 -d30s http://localhost:3007

 Running 30s test @ http://localhost:3007
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     5.45ms  729.74us  34.11ms   97.20%
    Req/Sec     6.09k   370.90     7.83k    92.00%
  2181301 requests in 30.02s, 332.84MB read
  Socket errors: connect 0, read 676, write 5, timeout 0
Requests/sec:  72670.72
Transfer/sec:     11.09MB
