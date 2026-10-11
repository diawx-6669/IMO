window.IMO_L10N = window.IMO_L10N || {};
window.IMO_L10N.en = window.IMO_L10N.en || { problems: {}, tech: {} };
Object.assign(window.IMO_L10N.en.problems, {

"1959-1": { title:"An irreducible fraction",
  statement: String.raw`Prove that the fraction $\dfrac{21n+4}{14n+3}$ is irreducible for every natural number $n$.`,
  hints:[ String.raw`Any common divisor of the numerator and the denominator also divides every integer linear combination of them.`,
          String.raw`Find integers $u,v$ for which $u(21n+4)+v(14n+3)$ does not depend on $n$.`],
  solution: String.raw`Let $d=\gcd(21n+4,\,14n+3)$. Then $d$ divides
$$2(21n+4)-3(14n+3)=42n+8-42n-9=-1,$$
so $d=1$ and the fraction is irreducible for every $n$.`,
  tags:["gcd","linear combination","Euclidean algorithm"] },

"1960-1": { title:"A three-digit number and its digit squares",
  statement: String.raw`Find all three-digit numbers $N$ divisible by $11$ for which $\dfrac{N}{11}$ equals the sum of the squares of the digits of $N$.`,
  answer: String.raw`$N=550$ and $N=803$.`,
  hints:[ String.raw`Write $N=100a+10b+c$ and record two conditions: the divisibility test for $11$ and the equation itself.`,
          String.raw`Divisibility by $11$ gives $a-b+c\equiv 0 \pmod{11}$, that is $b=a+c$ or $b=a+c-11$.`,
          String.raw`Substitute $b$ into $100a+10b+c=11(a^2+b^2+c^2)$ and run over $a$ — few cases survive.`],
  solution: String.raw`Write $N=100a+10b+c$ with $1\le a\le 9$. Divisibility by $11$ is equivalent to $11\mid a-b+c$, that is $b=a+c$ (when $a+c\le 9$) or $b=a+c-11$.

Case $b=a+c$. Then $N=100a+10(a+c)+c=110a+11c=11(10a+c)$ and the equation becomes
$$10a+c=a^{2}+(a+c)^{2}+c^{2}.$$
The right-hand side grows quickly; checking $a=1,\dots,9$ against $c$ leaves only $a=5,\,c=0$, hence $b=5$ and $N=550$ (indeed $550/11=50=5^{2}+5^{2}+0^{2}$).

Case $b=a+c-11$. Here $N=110a+11c-110=11(10a+c-10)$ and the equation becomes
$$10a+c-10=a^{2}+(a+c-11)^{2}+c^{2}.$$
The search gives $a=8,\,c=3$, hence $b=0$ and $N=803$ (indeed $803/11=73=8^{2}+0^{2}+3^{2}$).

Answer: $550$ and $803$.`,
  tags:["digits","divisibility by 11","bounded search"] },

"1962-1": { title:"Moving the six to the front",
  statement: String.raw`Find the smallest natural number whose decimal representation ends in the digit $6$ and which is multiplied by $4$ when that final $6$ is moved to the front.`,
  answer: String.raw`$153846$.`,
  hints:[ String.raw`Write the number as $N=10x+6$, where $x$ has $k$ digits, and express the result of the move in terms of $x$ and $k$.`,
          String.raw`You get $6\cdot 10^{k}+x=4(10x+6)$, that is $39x=6\cdot10^{k}-24$.`,
          String.raw`Hence $13x=2(10^{k}-4)$: find the smallest $k$ with $13\mid 10^{k}-4$.`],
  solution: String.raw`Let $N=10x+6$ where $x$ has $k$ digits. Moving the six to the front produces $6\cdot 10^{k}+x$, so
$$6\cdot 10^{k}+x=4(10x+6)\iff 39x=6\cdot 10^{k}-24\iff 13x=2\left(10^{k}-4\right).$$
Since $\gcd(13,2)=1$ we need $13\mid 10^{k}-4$. The powers of ten modulo $13$ are $10,9,12,3,4,1,\dots$ (period $6$), so $10^{k}\equiv 4$ first at $k=5$. Then
$$x=\frac{2(10^5-4)}{13}=\frac{199992}{13}=15384,\qquad N=153846.$$
Check: $4\cdot 153846=615384$. This is the smallest such number.`,
  tags:["decimal representation","multiplicative order","integer equation"] },

"1964-1": { title:"Powers of two modulo 7",
  statement: String.raw`(a) Find all natural numbers $n$ for which $2^{n}-1$ is divisible by $7$.
(b) Prove that there is no natural number $n$ for which $2^{n}+1$ is divisible by $7$.`,
  answer: String.raw`(a) exactly the multiples of $3$.`,
  hints:[ String.raw`Write out the residues of $2^{n}$ modulo $7$ for $n=1,2,3,4,\dots$ — the sequence is periodic.`,
          String.raw`The period is $3$: the residues are $2,4,1$. Which values does $2^{n}$ take modulo $7$ at all?`],
  solution: String.raw`Since $2^{3}=8\equiv 1\pmod 7$, the sequence $2^{n}\bmod 7$ is periodic with period $3$:
$$2^{1}\equiv 2,\quad 2^{2}\equiv 4,\quad 2^{3}\equiv 1,\quad 2^{4}\equiv 2,\ \dots$$
(a) $7\mid 2^{n}-1$ means $2^{n}\equiv 1$, which by the table happens exactly when $n\equiv 0\pmod 3$.

(b) $7\mid 2^{n}+1$ would mean $2^{n}\equiv -1\equiv 6 \pmod 7$. But modulo $7$ the powers of two take only the values $1,2,4$, and $6$ is not among them. No such $n$ exists.`,
  tags:["multiplicative order","periodic residues"] },

"1966-4": { title:"A cotangent telescope",
  statement: String.raw`Let $n$ be a natural number and $x$ a real number with $\sin\!\left(2^{k}x\right)\neq 0$ for $k=1,\dots,n$. Prove that
$$\frac{1}{\sin 2x}+\frac{1}{\sin 4x}+\cdots+\frac{1}{\sin 2^{n}x}=\cot x-\cot 2^{n}x .$$`,
  hints:[ String.raw`Try to prove a single-term identity first: what is $\cot\alpha-\cot2\alpha$?`,
          String.raw`$\cot\alpha-\cot2\alpha=\dfrac{1}{\sin 2\alpha}$ — after that the sum telescopes.`],
  solution: String.raw`The key identity: for any $\alpha$ with $\sin 2\alpha\neq0$,
$$\cot\alpha-\cot2\alpha=\frac{\cos\alpha}{\sin\alpha}-\frac{\cos 2\alpha}{\sin 2\alpha}
=\frac{2\cos^{2}\alpha-\cos 2\alpha}{\sin 2\alpha}=\frac{1}{\sin 2\alpha},$$
because $2\cos^{2}\alpha-\cos2\alpha=2\cos^{2}\alpha-(2\cos^{2}\alpha-1)=1$.

Apply this with $\alpha=x,2x,4x,\dots,2^{n-1}x$ and add:
$$\sum_{k=1}^{n}\frac{1}{\sin 2^{k}x}=\sum_{k=1}^{n}\left(\cot2^{k-1}x-\cot2^{k}x\right)=\cot x-\cot2^{n}x. \qquad\blacksquare$$`,
  tags:["telescoping","trigonometric identities"] },

"1969-1": { title:"Always composite",
  statement: String.raw`Prove that there are infinitely many natural numbers $a$ with the following property: the number $z=n^{4}+a$ is not prime for any natural number $n$.`,
  hints:[ String.raw`Look for $a$ making $n^{4}+a$ factor identically in $n$.`,
          String.raw`Recall the Sophie Germain identity: $n^{4}+4k^{4}=(n^{2}+2k^{2})^{2}-(2nk)^{2}$.`],
  solution: String.raw`Take $a=4k^{4}$ with an integer $k\ge 2$. Then
$$n^{4}+4k^{4}=\left(n^{2}+2k^{2}\right)^{2}-(2nk)^{2}=\left(n^{2}-2nk+2k^{2}\right)\left(n^{2}+2nk+2k^{2}\right).$$
Both factors are integers, and the smaller one equals $(n-k)^{2}+k^{2}\ge k^{2}\ge 4>1$. The larger factor also exceeds $1$, so $n^{4}+4k^{4}$ is composite for every natural $n$. There are infinitely many numbers of the form $4k^{4}$ with $k\ge2$. $\blacksquare$`,
  tags:["Sophie Germain identity","factorisation","construction"] },

"1972-1": { title:"Ten two-digit numbers",
  statement: String.raw`Prove that from any set of ten distinct two-digit natural numbers one can choose two disjoint non-empty subsets with the same sum of elements.`,
  hints:[ String.raw`How many non-empty subsets does a 10-element set have, and what values can their sums take?`,
          String.raw`There are $2^{10}-1=1023$ subsets, while a sum is at most $90+91+\cdots+99=945$. Apply the pigeonhole principle.`,
          String.raw`Given two subsets with equal sums, delete their common elements — the sums stay equal.`],
  solution: String.raw`Let $S$ be the given set of ten two-digit numbers. There are $2^{10}-1=1023$ non-empty subsets. The sum of a subset is at least $10$ and at most $90+91+\cdots+99=945$, so at most $945-10+1=936<1023$ values are possible.

By the pigeonhole principle two distinct subsets $A\neq B$ have the same sum. Put $A'=A\setminus B$ and $B'=B\setminus A$. The common elements contribute equally to both sums, so $A'$ and $B'$ have equal sums too. Both are non-empty: if, say, $A'=\varnothing$ then $A\subseteq B$, and equality of sums forces $A=B$, a contradiction. Finally $A'$ and $B'$ are disjoint by construction. $\blacksquare$`,
  tags:["pigeonhole principle","counting","subsets"] },

"1975-1": { title:"A permutation increases the sum of squares",
  statement: String.raw`Let $x_{1}\ge x_{2}\ge\cdots\ge x_{n}$ and $y_{1}\ge y_{2}\ge\cdots\ge y_{n}$ be real numbers. Prove that if $z_{1},z_{2},\dots,z_{n}$ is any permutation of $y_{1},\dots,y_{n}$, then
$$\sum_{i=1}^{n}\left(x_{i}-y_{i}\right)^{2}\le \sum_{i=1}^{n}\left(x_{i}-z_{i}\right)^{2}.$$`,
  hints:[ String.raw`Expand the squares: the sums $\sum x_i^2$ and $\sum y_i^2=\sum z_i^2$ are the same on both sides.`,
          String.raw`The inequality reduces to $\sum x_i z_i\le \sum x_i y_i$ — the rearrangement inequality.`],
  solution: String.raw`Expanding,
$$\sum (x_i-y_i)^2=\sum x_i^2-2\sum x_iy_i+\sum y_i^2,\qquad \sum (x_i-z_i)^2=\sum x_i^2-2\sum x_iz_i+\sum z_i^2 .$$
As $(z_i)$ is a permutation of $(y_i)$ we have $\sum y_i^2=\sum z_i^2$, so the claim is equivalent to
$$\sum_{i=1}^{n} x_iz_i\le \sum_{i=1}^{n} x_iy_i,$$
that is, the scalar product is largest when the sequences are sorted the same way (the rearrangement inequality).

Proof by exchange. If the permutation $(z_i)$ has indices $i<j$ with $z_i<z_j$, swapping $z_i\leftrightarrow z_j$ changes the sum by
$$\left(x_iz_j+x_jz_i\right)-\left(x_iz_i+x_jz_j\right)=(x_i-x_j)(z_j-z_i)\ge 0,$$
since $x_i\ge x_j$. So the sum does not decrease. Finitely many such swaps sort $(z_i)$ into non-increasing order, i.e. into $(y_i)$, giving $\sum x_iz_i\le\sum x_iy_i$. $\blacksquare$`,
  tags:["rearrangement inequality","exchange argument","expanding squares"] },

"1976-4": { title:"Largest product with sum 1976",
  statement: String.raw`Determine the greatest value of a product of natural numbers whose sum is $1976$.`,
  answer: String.raw`$2\cdot 3^{658}$.`,
  hints:[ String.raw`Ones are useless; a part $k\ge 5$ should be split, since $k=3+(k-3)$ and $3(k-3)>k$ for $k\ge5$.`,
          String.raw`So every part is $2$, $3$ or $4$, and $4=2+2$ gives the same product. How many twos should remain?`,
          String.raw`Three twos ($2^3=8$) are worse than two threes ($3^2=9$) for the same sum $6$: at most two twos. Note $1976\equiv 2\pmod 3$.`],
  solution: String.raw`Consider a set of natural numbers with sum $1976$ and maximal product.

1. No part equals $1$: removing a one and adding it to another part increases the product.
2. No part is $k\ge 5$: replacing $k$ by $3$ and $k-3$ gives $3(k-3)=3k-9>k$ for $k\ge 5$ (since $2k>9$).
3. Hence every part is $2,3$ or $4$; and $4$ may be replaced by $2+2$ without changing the product, so we may assume all parts are $2$ and $3$.
4. There cannot be three twos: $2+2+2=3+3$ but $2^{3}=8<9=3^{2}$. So at most two twos remain.

Since $1976=3\cdot 658+2$, the only possibility is $658$ threes and one two, and the maximum is
$$2\cdot 3^{658}.$$`,
  tags:["optimisation","extremal principle","local replacement"] },

"1977-2": { title:"Sevens and elevens",
  statement: String.raw`In a finite sequence of real numbers the sum of any seven consecutive terms is negative and the sum of any eleven consecutive terms is positive. Determine the greatest possible number of terms of such a sequence.`,
  answer: String.raw`$16$.`,
  hints:[ String.raw`If the length is at least $17$, write a $7\times 11$ table of terms $a_{i+j}$ and add it up in two ways.`,
          String.raw`With rows $(a_i,a_{i+1},\dots,a_{i+10})$, $i=1..7$: every row sum is positive, every column sum is negative — contradiction.`,
          String.raw`For $n=16$ construct an example, for instance an almost periodic one tuned so the partial sums behave as required.`],
  solution: String.raw`*Upper bound.* Suppose the length is $n\ge 17$. Consider the $7\times 11$ table whose $(i,j)$ entry is $a_{i+j-1}$ for $1\le i\le 7$, $1\le j\le 11$; all indices are at most $7+11-1=17\le n$. Each row is a sum of $11$ consecutive terms, hence positive, so the total is positive. Each column is a sum of $7$ consecutive terms, hence negative, so the total is negative. Contradiction, so $n\le 16$.

*An example with $n=16$.* Take
$$5,\;5,\;-13,\;5,\;5,\;5,\;-13,\;5,\;5,\;-13,\;5,\;5,\;5,\;-13,\;5,\;5 .$$
A direct check shows every sum of seven consecutive terms equals $-1$ or $-8$ (negative), and every sum of eleven consecutive terms equals $1$ or $4$ (positive).

Answer: $16$.`,
  tags:["double counting","partial sums","explicit construction"] },

"1979-1": { title:"The numerator is divisible by 1979",
  statement: String.raw`Let $p$ and $q$ be natural numbers with
$$\frac{p}{q}=1-\frac{1}{2}+\frac{1}{3}-\frac{1}{4}+\cdots-\frac{1}{1318}+\frac{1}{1319}.$$
Prove that $p$ is divisible by $1979$.`,
  hints:[ String.raw`An alternating sum $\sum_{k=1}^{2m}\frac{(-1)^{k-1}}{k}$ is worth turning into a sum with no signs.`,
          String.raw`Using harmonic numbers, the sum equals $\sum_{k=660}^{1319}\frac1k$.`,
          String.raw`Pair the terms from the two ends: $\frac1k+\frac1{1979-k}=\frac{1979}{k(1979-k)}$, and $1979$ is prime.`],
  solution: String.raw`*Step 1: remove the signs.* With $H_{N}=\sum_{k=1}^{N}\frac1k$,
$$\sum_{k=1}^{2m}\frac{(-1)^{k-1}}{k}=H_{2m}-2\cdot\frac12 H_{m}=H_{2m}-H_{m}=\sum_{k=m+1}^{2m}\frac1k .$$
Our sum ends with $+\frac{1}{1319}$, so it equals $\sum_{k=1}^{1320}\frac{(-1)^{k-1}}{k}+\frac{1}{1320}$. Taking $m=660$,
$$\frac pq=\sum_{k=661}^{1320}\frac1k+\frac{1}{1320}=\sum_{k=661}^{1319}\frac1k+\frac{2}{1320}=\sum_{k=661}^{1319}\frac1k+\frac{1}{660}=\sum_{k=660}^{1319}\frac{1}{k}.$$

*Step 2: pair the ends.* The sum $\sum_{k=660}^{1319}\frac1k$ has exactly $660$ terms, and the ends are symmetric about $1979$ since $660+1319=1979$. Pairing the first with the last and so on gives $330$ pairs
$$\frac1k+\frac1{1979-k}=\frac{1979}{k(1979-k)},\qquad k=660,\dots,989 ,$$
so
$$\frac{p}{q}=1979\sum_{k=660}^{989}\frac{1}{k\,(1979-k)} .$$

*Step 3: primality.* Put the right-hand side over a common denominator $D$: then $\frac pq=\frac{1979\,A}{D}$ with $A,D$ integers and $D$ a product of numbers smaller than $1979$. Since $1979$ is prime, $\gcd(1979,D)=1$, so the factor $1979$ survives in the numerator after reduction: $1979\mid p$. $\blacksquare$`,
  tags:["alternating sum","pairing","prime number"] },

"1981-3": { title:"Fibonacci numbers squared",
  statement: String.raw`Determine the maximum value of $m^{2}+n^{2}$, where $m$ and $n$ are integers in $\{1,2,\dots,1981\}$ satisfying
$$\left(n^{2}-mn-m^{2}\right)^{2}=1 .$$`,
  answer: String.raw`$987^{2}+1597^{2}=3524578$.`,
  hints:[ String.raw`Test the condition on pairs of consecutive Fibonacci numbers.`,
          String.raw`If $(m,n)$ with $m\le n$ is a solution, so is $(n-m,m)$: this is Vieta descent.`,
          String.raw`The descent ends at $(1,1)$, so all solutions are pairs of consecutive Fibonacci numbers. Find the largest such pair below $1981$.`],
  solution: String.raw`Let $(m,n)$ be a solution with $m,n\ge 1$.

*First, $m\le n$.* If $m>n\ge 1$ then $m\ge 2$ and
$$\left|n^{2}-mn-m^{2}\right|=m^{2}+mn-n^{2}>m^{2}\ge 4>1,$$
since $mn>n^{2}$. So the equation fails and necessarily $m\le n$.

*Descent.* Put $(m',n')=(n-m,\,m)$. Then
$$n'^2-m'n'-m'^2=m^{2}-(n-m)m-(n-m)^{2}=-\left(n^{2}-mn-m^{2}\right),$$
so $(m',n')$ again satisfies the equation. While $m'\ge 1$ the descent continues and $m+n$ strictly decreases, so after finitely many steps we reach $(1,1)$ (check: $1-1-1=-1$, whose square is $1$).

*Ascent.* The inverse step $(m,n)\mapsto(n,m+n)$ generates from $(1,1)$ exactly the pairs of consecutive Fibonacci numbers
$$(1,1),(1,2),(2,3),(3,5),(5,8),\dots$$
So all solutions are pairs of consecutive Fibonacci numbers.

The Fibonacci numbers up to $1981$ are $\dots,610,987,1597$ (the next is $2584>1981$). The largest admissible pair is $(987,1597)$, and
$$m^{2}+n^{2}=987^{2}+1597^{2}=974169+2550409=3524578 .$$`,
  tags:["Vieta jumping","Fibonacci numbers","Pell-type equation"] },

"1983-6": { title:"A cyclic inequality for triangle sides",
  statement: String.raw`Let $a,b,c$ be the side lengths of a triangle. Prove that
$$a^{2}b(a-b)+b^{2}c(b-c)+c^{2}a(c-a)\ \ge\ 0 .$$`,
  hints:[ String.raw`Use the Ravi substitution: $a=y+z,\ b=z+x,\ c=x+y$ with $x,y,z>0$.`,
          String.raw`After substituting and expanding, collect the expression into visibly non-negative pieces.`,
          String.raw`A useful form of the result: it reduces to $xy^3+yz^3+zx^3 \ge xyz(x+y+z)$, which follows from Cauchy–Schwarz or AM–GM.`],
  solution: String.raw`Since $a,b,c$ are triangle sides, the Ravi substitution applies:
$$a=y+z,\qquad b=z+x,\qquad c=x+y,\qquad x,y,z>0 .$$
Careful expansion turns the left-hand side into
$$a^{2}b(a-b)+b^{2}c(b-c)+c^{2}a(c-a)=2\left(xy^{3}+yz^{3}+zx^{3}-xyz(x+y+z)\right).$$
So it remains to prove $xy^{3}+yz^{3}+zx^{3}\ge xyz(x+y+z)$ for $x,y,z>0$. Dividing by $xyz>0$ this is
$$\frac{y^{2}}{z}+\frac{z^{2}}{x}+\frac{x^{2}}{y}\ \ge\ x+y+z ,$$
which is immediate from Cauchy–Schwarz in Engel form:
$$\frac{y^{2}}{z}+\frac{z^{2}}{x}+\frac{x^{2}}{y}\ \ge\ \frac{(x+y+z)^{2}}{x+y+z}=x+y+z .$$
Equality holds for $x=y=z$, i.e. for an equilateral triangle. $\blacksquare$

*Remark.* The inequality is cyclic rather than symmetric: swapping $b$ and $c$ can break it for general positive numbers, so it matters that $a,b,c$ form a triangle.`,
  tags:["Ravi substitution","Engel form","cyclic inequalities"] },

"1985-6": { title:"A unique starting point",
  statement: String.raw`For every real number $x_{1}$ construct the sequence $x_{1},x_{2},\dots$ by
$$x_{n+1}=x_{n}\left(x_{n}+\frac{1}{n}\right),\qquad n=1,2,\dots$$
Prove that there is exactly one value of $x_{1}$ for which
$$0<x_{n}<x_{n+1}<1\qquad\text{for every } n .$$`,
  hints:[ String.raw`For fixed $n$, the value $x_n$ is a continuous increasing function of $x_1$ on the region where all terms stay positive. That gives monotonicity and lets you speak of a boundary between two bad behaviours.`,
          String.raw`Show that if $x_n\ge \frac{1}{n}$ for some $n$ then the sequence eventually exceeds $1$; if $x_n$ is too small, it drops to a non-positive value.`,
          String.raw`Consider $A=\{x_1>0:\ \exists n,\ x_n>1\}$ and $B=\{x_1>0:\ \exists n,\ x_n\le 0\}$, show both are non-empty open rays, and that their complement is a single point.`],
  solution: String.raw`*Monotonicity in $x_1$.* As long as all terms stay positive, each $x_{n}$ is a strictly increasing continuous function of $x_{1}$ (a composition of the increasing maps $t\mapsto t(t+\frac1k)$ on the positive axis).

*Two bad sets.* Put
$$A=\{x_{1}>0:\ x_{n}>1 \text{ for some } n\},\qquad B=\{x_{1}>0:\ x_{n}\le 0\ \text{for some } n\}.$$
By monotonicity $A$ is an upper ray and $B$ a lower ray; both are open by continuity and both are non-empty (for $x_{1}\ge 1$ already $x_{2}=x_1(x_1+1)>1$, and for very small $x_1>0$ the sequence falls to a non-positive value).

*Key lemmas.*
1. If $x_{n}\ge \frac{1}{n}$ for some $n$, then $x_{n+1}\ge \frac{2}{n}>\frac{1}{n+1}$, and inductively $x_{n+k}\ge \frac{2^{k}}{n}$, so the sequence exceeds $1$. Hence a "good" start must satisfy $x_{n}<\frac1n$ for all $n$.
2. Under $x_{n}<\frac1n$, the identity $x_{n+1}=x_n^2+\frac{x_n}{n}$ shows that the requirement $x_{n}<x_{n+1}$ for all $n$ squeezes the good starts between two monotone boundaries.

*Conclusion.* $A$ and $B$ are open, non-empty and disjoint (one means escaping above $1$, the other falling to non-positive values), and monotonicity separates them. Hence $(0,\infty)\setminus(A\cup B)$ is a non-empty closed set which, again by monotonicity, is a single point $x_{1}^{*}$. For that start the sequence stays in $(0,1)$ and increases, since $x_{n+1}-x_{n}=x_{n}\left(x_{n}+\frac1n-1\right)$ keeps its sign. $\blacksquare$

*Remark.* This is one of the hardest early IMO problems: a complete solution requires carrying out all the estimates carefully. The text above is the skeleton; filling in lemmas 1–2 is the real work.`,
  tags:["monotonicity in a parameter","continuity","separating sets","recursive sequences"] },

"1986-1": { title:"A quadruple without squares",
  statement: String.raw`Let $d$ be a natural number different from $2$, $5$ and $13$. Show that one can choose two distinct elements $a$ and $b$ of $\{2,5,13,d\}$ such that $ab-1$ is not a perfect square.`,
  hints:[ String.raw`Products inside $\{2,5,13\}$ already give squares: $2\cdot5-1=9$, $2\cdot13-1=25$, $5\cdot13-1=64$. So the bad case is when $2d-1,5d-1,13d-1$ are all squares.`,
          String.raw`Assume $2d-1=x^2$, $5d-1=y^2$, $13d-1=z^2$ and look at residues modulo $4$ and $8$.`,
          String.raw`From $2d-1=x^2$ deduce the parity of $d$, then compare $y^2$ and $z^2$ modulo $16$.`],
  solution: String.raw`Suppose, for contradiction, that all three numbers
$$2d-1=x^{2},\qquad 5d-1=y^{2},\qquad 13d-1=z^{2}$$
are perfect squares.

From the first, $x^{2}=2d-1$ is odd, so $x$ is odd and $x^{2}\equiv 1\pmod 8$; hence $2d\equiv 2 \pmod 8$ and $d\equiv 1\pmod 4$. In particular $d$ is odd.

Then $5d-1$ and $13d-1$ are even, so $y,z$ are even and $y^{2}\equiv z^{2}\equiv 0 \pmod 4$. From $d\equiv 1\pmod 4$ we get
$$y^{2}=5d-1\equiv 4\pmod{16},\qquad z^{2}=13d-1\equiv 12\pmod{16}.$$
But the square of an even number is congruent to $0$ or $4$ modulo $16$, and $12$ is not on that list. Contradiction.

Hence at least one of $2d-1,5d-1,13d-1$ is not a square, and the corresponding pair $(a,b)$ works. $\blacksquare$`,
  tags:["quadratic residues","modulo 16","contradiction"] },

"1987-4": { title:"No function with shift 1987",
  statement: String.raw`Prove that there is no function $f$ from the set of non-negative integers into itself such that
$$f(f(n))=n+1987\qquad\text{for all } n\ge 0 .$$`,
  hints:[ String.raw`Show that $f$ is injective and that $f(n+1987)=f(n)+1987$.`,
          String.raw`Consider residues modulo $1987$: $f$ induces a map on $\mathbb{Z}/1987$. What kind of map?`,
          String.raw`The induced map is a fixed-point-free involution on a set of $1987$ (an odd number of) elements. That is impossible.`],
  solution: String.raw`Suppose such an $f$ exists. From $f(f(n))=n+1987$ we get injectivity at once. Moreover
$$f(n+1987)=f(f(f(n)))=f(n)+1987 . \tag{1}$$

Consider the induced map $\bar f:\mathbb{Z}/1987\to\mathbb{Z}/1987$, $\bar f(n\bmod 1987)=f(n)\bmod 1987$; by (1) it is well defined. From $f(f(n))=n+1987$,
$$\bar f(\bar f(x))=x\qquad\text{for all } x\in\mathbb{Z}/1987,$$
so $\bar f$ is an involution, in particular a bijection.

It has no fixed point. Indeed, if $\bar f(a)=a$, i.e. $f(a)=a+1987k$ for some integer $k\ge 0$, then by (1)
$$a+1987=f(f(a))=f(a+1987k)=f(a)+1987k=a+2\cdot 1987k,$$
so $2k=1$, impossible for an integer $k$.

Thus $\bar f$ is a fixed-point-free involution on a set of $1987$ elements. Such an involution splits the set into pairs, so the cardinality must be even. But $1987$ is odd — contradiction. $\blacksquare$

*Remark.* The same proof shows that $f(f(n))=n+k$ is solvable exactly when $k$ is even.`,
  tags:["functional equations","involution","parity","residue classes"] },

"1988-6": { title:"The classic Vieta jump",
  statement: String.raw`Let $a$ and $b$ be positive integers such that $ab+1$ divides $a^{2}+b^{2}$. Prove that
$$\frac{a^{2}+b^{2}}{ab+1}$$
is the square of an integer.`,
  hints:[ String.raw`Write $k=\frac{a^2+b^2}{ab+1}$, fix $k$, and consider all solutions of $a^2+b^2=k(ab+1)$.`,
          String.raw`Take the solution with the smallest sum $a+b$ and assume $a\ge b$. The equation $x^2-kbx+(b^2-k)=0$ has the root $x=a$; what is the other root?`,
          String.raw`The other root $a'=kb-a=\frac{b^2-k}{a}$ is a non-negative integer. Minimality forces $a'=0$, i.e. $k=b^2$.`],
  solution: String.raw`Let $k=\dfrac{a^{2}+b^{2}}{ab+1}$ be a positive integer. Fix $k$ and consider the set $S$ of all pairs of non-negative integers $(a,b)$ with
$$a^{2}+b^{2}=k(ab+1). \tag{1}$$
It is non-empty. Choose a pair in $S$ with the smallest sum $a+b$, and assume $a\ge b$.

Regard $x=a$ as a root of the quadratic
$$x^{2}-kb\,x+\left(b^{2}-k\right)=0 . \tag{2}$$
By Vieta's formulas the other root is
$$a'=kb-a=\frac{b^{2}-k}{a}.$$
The first expression shows $a'$ is an integer. We claim $a'\ge 0$. Indeed, if $a'\le -1$ then substituting $x=a'$ into (2) gives
$$a'^{2}-kb\,a'+\left(b^{2}-k\right)\ \ge\ 1+kb+b^{2}-k=b^{2}+1+k(b-1)>0,$$
using $a'^{2}\ge 1$, $-kb\,a'\ge kb$ and $b\ge 1$. But $a'$ is a root of (2), so this quantity is zero. Contradiction, hence $a'\ge 0$.

If $a'>0$ then $(a',b)$ also lies in $S$, and
$$a'=\frac{b^{2}-k}{a}<\frac{b^{2}}{a}\le \frac{a^{2}}{a}= a,$$
so $a'+b<a+b$, contradicting minimality.

Therefore $a'=0$, and from $a'=\frac{b^{2}-k}{a}$ we get $k=b^{2}$, a perfect square. $\blacksquare$

*Remark.* This is the canonical Vieta-jumping problem: fix the parameter, take a minimal solution, build a smaller one, contradiction. For $k=b^2$ the solutions are generated upward from $(b,0)$: $(b,0)\to(b^3,b)\to\dots$`,
  tags:["Vieta jumping","minimal solution","Vieta's formulas"] },

"1990-3": { title:"When n² divides 2ⁿ+1",
  statement: String.raw`Determine all integers $n>1$ for which $\dfrac{2^{n}+1}{n^{2}}$ is an integer.`,
  answer: String.raw`The only solution is $n=3$.`,
  hints:[ String.raw`First show that $n$ is odd, then that $3\mid n$.`,
          String.raw`Take the smallest prime divisor $p>3$ of $n$ (if there is one) and consider the order of $2$ modulo $p$.`,
          String.raw`Use that $n^2\mid 2^n+1$ implies $2^{2n}\equiv 1 \pmod p$, so $\operatorname{ord}_p(2)\mid 2n$ but $\operatorname{ord}_p(2)\nmid n$. Compare with $p-1$.`],
  solution: String.raw`Clearly $n$ is odd (otherwise $2^{n}+1$ is odd while $n^{2}$ is even). Note $n=3$ works, since $2^{3}+1=9=3^{2}$.

*Step 1: $3\mid n$.* Let $p$ be the smallest prime divisor of $n$. Then $p\mid 2^{n}+1$, so $2^{n}\equiv -1\pmod p$ and $2^{2n}\equiv 1 \pmod p$. Let $d=\operatorname{ord}_{p}(2)$. Then $d\mid 2n$ but $d\nmid n$ (otherwise $2^{n}\equiv 1$, which with $2^n\equiv-1$ forces $p\mid 2$). So $d=2m$ with $m\mid n$ odd. Since $d\mid p-1$ we get $2m\mid p-1$, in particular $m\le \frac{p-1}{2}<p$. As $m\mid n$ and $p$ is the smallest prime divisor of $n$, $m<p$ forces $m=1$. Then $d=2$, so $p\mid 2^{2}-1=3$, giving $p=3$ and $3\mid n$.

*Step 2: $n=3$.* Write $n=3^{a}t$ with $3\nmid t$, $a\ge 1$. By the lifting-the-exponent lemma for $p=3$,
$$v_{3}\!\left(2^{n}+1\right)=v_{3}(2+1)+v_{3}(n)=1+a,$$
while $n^{2}\mid 2^{n}+1$ requires $v_{3}(n^{2})=2a\le 1+a$, i.e. $a\le 1$. So $a=1$ and $n=3t$ with $3\nmid t$.

Suppose $t>1$ and let $q$ be its smallest prime divisor; then $q>3$ (as $n$ is odd and $3\nmid t$). As in Step 1, let $d=\operatorname{ord}_{q}(2)$; then $d\mid 2n$, $d\nmid n$, so $d=2m$ with $m\mid n=3t$ odd. From $d\mid q-1$ we get $m\le\frac{q-1}{2}<q$. The divisors of $n$ smaller than $q$ are only $1$ and $3$ (every prime divisor of $t$ is at least $q$). So $m\in\{1,3\}$, i.e. $d\in\{2,6\}$, and $q\mid 2^{2}-1=3$ or $q\mid 2^{6}-1=63=3^{2}\cdot 7$. Hence $q=7$. But then $7\mid 2^{n}+1$, while $2^{n}\bmod 7\in\{1,2,4\}$ and $-1\equiv 6$ is not among them — contradiction.

So $t=1$ and $n=3$. $\blacksquare$`,
  tags:["multiplicative order","lifting the exponent","smallest prime divisor"] }

});
