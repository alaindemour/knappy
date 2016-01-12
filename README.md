# knappy
Musings on knapsack problems.
That's a recursive and memoized version of the 0 1 problem, which has better time and space complexity than the bottom up dynamic programming approach that is in all textbooks

# Performance
Interestingly enought this is one of the rare practical problem where we can use a version of the Y combinator:
to memoize the highly recursive knapsack solution we can do it using a "memoizing" Y combinator, thus cleaning separating
the problem logic from the the caching and memozing "plumbing".
The Y combinator does not add much performance overhead here, the performance is really affected by how performant 
the multi-dimenstional lookup table used for the cache is. A well sized and optimized one can have a 10x performance difference 
with a totally dynamic one

# node version
To run the code you need node 5.4.0 or higher with the harmony flag on as the code uses ES6 rest parameters

