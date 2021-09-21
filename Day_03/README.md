# Redis

- Redis is just some place like your bowsers local storage in which you store this key-value(like json) pair.
- It is not a database.
- how to install ?

    $ sudo add-apt-repository ppa:redislabs/redis
    $ sudo apt-get update
    $ sudo apt-get install redis

- how to start / stop the redis server.
    - sudo service redis-server start
    - sudo service redis-server stop
- some basic commands
    - set name gauti
    - get name
    - del name
    - exists name
    - expire name 10
    - ttl name
    - setex name 10 gauti
    - keys *
    - flushall
- arrays commands
    - lpush nums 1
    - lrange nums 0 -1
    - rpush nums 2
    - lpop nums
    - rpop nums
- set commands
    - sadd lal "red hat"
    - smembers lal
- object commands
    - called hashes in redis
    - hset person name gauti
    - hget person name
    - hgetall person
    - hdel person age
    - hexists person age
- pub and sub commands
    - pub = publish
    - publisher = who sends
    - sub = subscribe
    - subscriber = who sees
    - psubscribe  d* = subscribe all channel starting from "d"
    - unsubscribe devsnest = unsubscribe devsnest
    - punsubscribe d* = unsubscribe form all d channels
    - no history in this.

    ```sql
    127.0.0.1:6379> subscribe devsnest
    Reading messages... (press Ctrl-C to quit)
    1) "subscribe"
    2) "devsnest"
    3) (integer) 1
    1) "message"
    2) "devsnest"
    3) "hello"
    1) "message"
    2) "devsnest"
    3) "hello123"

    127.0.0.1:6379> subscribe devsnest
    Reading messages... (press Ctrl-C to quit)
    1) "subscribe"
    2) "devsnest"
    3) (integer) 1
    publish devsnest hello
    ^C
    shahs@Gauti-PC:/mnt/c/Users/KIIT$ redis-cli
    127.0.0.1:6379> publish devsnest hello
    (integer) 1
    127.0.0.1:6379> publish devsnest hello123
    (integer) 1

    127.0.0.1:6379> psubscribe d*
    Reading messages... (press Ctrl-C to quit)
    1) "psubscribe"
    2) "d*"
    3) (integer) 1
    1) "pmessage"
    2) "d*"
    3) "devs"
    4) "hello"

    127.0.0.1:6379> psubscribe d*
    Reading messages... (press Ctrl-C to quit)
    1) "psubscribe"
    2) "d*"
    3) (integer) 1
    ^C
    shahs@Gauti-PC:/mnt/c/Users/KIIT$ redis-cli
    127.0.0.1:6379> publish devs hello
    (integer) 1

    127.0.0.1:6379> unsubscribe devsnest
    1) "unsubscribe"
    2) "devsnest"
    3) (integer) 0

    127.0.0.1:6379> punsubscribe d*
    1) "punsubscribe"
    2) "d*"
    3) (integer) 0
    ```

- Xadd
    - xadd mystream 10000  = makes a stram with particular key that has history.
    - keys must be different for every entry.
    - if we add * instead of a key then redis gives a random key to that value.
    - xadd mystream maxlen 100000 * name devi = put limit in the no. of entries being received. in this the older msgs will be deleted and new msgs will be on top like a stack structure.

    ```sql
    127.0.0.1:6379> xadd mystream 10000 name anna
    "10000-0"

    127.0.0.1:6379> xadd mystream 10000 name waannna
    (error) ERR The ID specified in XADD is equal or smaller than the target stream top item
    127.0.0.1:6379> xadd mystream 10001 name waannna
    "10001-0"
    127.0.0.1:6379> xadd mystream 10002 name banna
    "10002-0"

    127.0.0.1:6379> xadd mystream * name random
    "1631085206094-0"
    127.0.0.1:6379> xadd mystream * name gauti
    "1631085234703-0"

    127.0.0.1:6379> xadd mystream maxlen 100000 * name devi
    "1631085559430-0"

    ```

- xread
    - xread count 200 streams mystream 0 = reads the history of the no. of msgs starting from 0 to 200.
    - xread block 10000 streams mystream 0 = if any data is not received under 10 secs then disconnect this stream. keep 0  if you don't want to disconnect the stream.
    - xread block 10000 streams mystream $ = more like pub sub but if no msgs received under 10 secs the disconnect the stream

    ```sql
    127.0.0.1:6379> xread count 200 streams mystream 0
    1) 1) "mystream"
       2) 1) 1) "10000-0"
             2) 1) "name"
                2) "anna"
          2) 1) "10001-0"
             2) 1) "name"
                2) "waannna"
          3) 1) "10002-0"
             2) 1) "name"
                2) "banna"
          4) 1) "1631085206094-0"
             2) 1) "name"
                2) "random"
          5) 1) "1631085234703-0"
             2) 1) "name"
                2) "gauti"
          6) 1) "1631085559430-0"
             2) 1) "name"
                2) "devi"

    127.0.0.1:6379> xread count 200 streams mystream 10002-0
    1) 1) "mystream"
       2) 1) 1) "1631085206094-0"
             2) 1) "name"
                2) "random"
          2) 1) "1631085234703-0"
             2) 1) "name"
                2) "gauti"
          3) 1) "1631085559430-0"
             2) 1) "name"
                2) "devi"

    127.0.0.1:6379> xread block 10000 streams mystream 0
    1) 1) "mystream"
       2) 1) 1) "10000-0"
             2) 1) "name"
                2) "anna"
          2) 1) "10001-0"
             2) 1) "name"
                2) "waannna"
          3) 1) "10002-0"
             2) 1) "name"
                2) "banna"
          4) 1) "1631085206094-0"
             2) 1) "name"
                2) "random"
          5) 1) "1631085234703-0"
             2) 1) "name"
                2) "gauti"
          6) 1) "1631085559430-0"
             2) 1) "name"
                2) "devi"

    127.0.0.1:6379> xread block 0 streams mystream 0
    1) 1) "mystream"
       2) 1) 1) "10000-0"
             2) 1) "name"
                2) "anna"
          2) 1) "10001-0"
             2) 1) "name"
                2) "waannna"
          3) 1) "10002-0"
             2) 1) "name"
                2) "banna"
          4) 1) "1631085206094-0"
             2) 1) "name"
                2) "random"
          5) 1) "1631085234703-0"
             2) 1) "name"
                2) "gauti"
          6) 1) "1631085559430-0"
             2) 1) "name"
                2) "devi"

    127.0.0.1:6379> xread block 10000 streams mystream $
    (nil)
    (10.02s)

    127.0.0.1:6379> xread block 10000 streams mystream $
    1) 1) "mystream"
       2) 1) 1) "1631086990806-0"
             2) 1) "name"
                2) "gauti"
    (4.25s)

    127.0.0.1:6379> xadd mystream * name gauti
    "1631086990806-0"

    ```

- xrange
    - xrange mystream 10001-0 1631085559430-0 = reads the history of msgs from one id no. to another.
    - xrange mystream 10001-0 1631085559430-0 count 5 = same but shows first 5 rows data.
    - xrange mystream - + count 3 = same but what if we dont know the upper and lower bound.
    - xrevrange mystream + - count 3 = same but if we want the data in reverse order.

    ```sql
    127.0.0.1:6379> xread block 0 streams mystream 0
    1) 1) "mystream"
       2) 1) 1) "10000-0"
             2) 1) "name"
                2) "anna"
          2) 1) "10001-0"
             2) 1) "name"
                2) "waannna"
          3) 1) "10002-0"
             2) 1) "name"
                2) "banna"
          4) 1) "1631085206094-0"
             2) 1) "name"
                2) "random"
          5) 1) "1631085234703-0"
             2) 1) "name"
                2) "gauti"
          6) 1) "1631085559430-0"
             2) 1) "name"
                2) "devi"
    127.0.0.1:6379> xread block 10000 streams mystream $
    (nil)
    (10.02s)
    127.0.0.1:6379> xread block 10000 streams mystream $
    1) 1) "mystream"
       2) 1) 1) "1631086990806-0"
             2) 1) "name"
                2) "gauti"
    (4.25s)
    127.0.0.1:6379> xrange mystream 0 -1
    (error) ERR Invalid stream ID specified as stream command argument
    127.0.0.1:6379> xread block streams mystream 0
    (error) ERR timeout is not an integer or out of range
    127.0.0.1:6379> xread count 200 streams mystream 0
    1) 1) "mystream"
       2) 1) 1) "10000-0"
             2) 1) "name"
                2) "anna"
          2) 1) "10001-0"
             2) 1) "name"
                2) "waannna"
          3) 1) "10002-0"
             2) 1) "name"
                2) "banna"
          4) 1) "1631085206094-0"
             2) 1) "name"
                2) "random"
          5) 1) "1631085234703-0"
             2) 1) "name"
                2) "gauti"
          6) 1) "1631085559430-0"
             2) 1) "name"
                2) "devi"
          7) 1) "1631086981822-0"
             2) 1) "name"
                2) "gauti"
          8) 1) "1631086990806-0"
             2) 1) "name"
                2) "gauti"
    127.0.0.1:6379> xrange mystream 10001-0 1631085559430-0
    1) 1) "10001-0"
       2) 1) "name"
          2) "waannna"
    2) 1) "10002-0"
       2) 1) "name"
          2) "banna"
    3) 1) "1631085206094-0"
       2) 1) "name"
          2) "random"
    4) 1) "1631085234703-0"
       2) 1) "name"
          2) "gauti"
    5) 1) "1631085559430-0"
       2) 1) "name"
          2) "devi"

    127.0.0.1:6379> xrange mystream 10001-0 1631085559430-0 count 3
    1) 1) "10001-0"
       2) 1) "name"
          2) "waannna"
    2) 1) "10002-0"
       2) 1) "name"
          2) "banna"
    3) 1) "1631085206094-0"
       2) 1) "name"
          2) "random"

    127.0.0.1:6379> xrange mystream - + count 3
    1) 1) "10000-0"
       2) 1) "name"
          2) "anna"
    2) 1) "10001-0"
       2) 1) "name"
          2) "waannna"
    3) 1) "10002-0"
       2) 1) "name"
          2) "banna"

    127.0.0.1:6379> xrevrange mystream + - count 3
    1) 1) "1631086990806-0"
       2) 1) "name"
          2) "gauti"
    2) 1) "1631086981822-0"
       2) 1) "name"
          2) "gauti"
    3) 1) "1631085559430-0"
       2) 1) "name"
          2) "devi"
    ```

```sql
Notes from Audarya

Redis Installation

1) For Windows
	- Enable WSL from "Turn Windows features on or off settings"
	- Restart the machine
	- Install Ubuntu20.04 from Windows Store
	- Open Ubuntu and setup name and password
	- Run the following commands:
		> sudo apt-get update
		> sudo apt-get upgrade
		> sudo apt-get install redis-server
		> sudo service redis-server restart
		> redis-cli

2) For Linux
	- Run the commands:
		> sudo apt-get install redis-server
		> sudo service redis-server restart
		> redis-cli

-----------------------------------------------------------------------

USAGE

- SET key value
- GET key
- ttl key
- KEYS *
- DEL key
- FLUSHALL
- EXISTS key
- expire key time
- setex key time value
	

For Arrays

- LPUSH array value
- RPUSH array value
- LRANGE array start stop
- LPOP array
- RPOP array

For Sets

- SADD myset value
- SMEMBERS myset

For Object/Hash

- HSET key field value 
- HGET key field
- HGETALL key
- HDEL key field
- HEXISTS key field
```