window.IMO_L10N = window.IMO_L10N || {};
window.IMO_L10N.en = window.IMO_L10N.en || { problems: {}, tech: {} };
Object.assign(window.IMO_L10N.en.problems, {

"1992-1": { title:"A divisor of the product minus one",
  statement: String.raw`Find all integers $a,b,c$ with $1<a<b<c$ such that $(a-1)(b-1)(c-1)$ is a divisor of $abc-1$.`,
  answer: String.raw`$(a,b,c)=(2,4,8)$ and $(a,b,c)=(3,5,15)$.`,
  hints:[ String.raw`Set $k=\dfrac{abc-1}{(a-1)(b-1)(c-1)}$ and bound $k$ above by $\frac{a}{a-1}\cdot\frac{b}{b-1}\cdot\frac{c}{c-1}$.`,
          String.raw`Show $k\ge 2$, while for $a\ge 4$ the bound gives $k<2$. Hence $a\in\{2,3\}$.`,
          String.raw`For $a=2$ use parity: $abc-1$ is odd, so $k$ is odd. In each case the equation factors as $(b-t)(c-t)=\text{const}$.`],
  solution: String.raw`Let $k=\dfrac{abc-1}{(a-1)(b-1)(c-1)}$ be a positive integer.

*Bounds on $k$.* Expanding, $(a-1)(b-1)(c-1)=abc-(ab+bc+ca)+(a+b+c)-1$. Since $a\ge 2$ we have $ab+bc+ca>a+b+c$, so $(a-1)(b-1)(c-1)<abc-1$ and $k\ge 2$. On the other hand
$$k<\frac{abc}{(a-1)(b-1)(c-1)}=\frac{a}{a-1}\cdot\frac{b}{b-1}\cdot\frac{c}{c-1}.$$
For $a\ge 4$ (hence $b\ge5$, $c\ge6$) the right-hand side is at most $\frac43\cdot\frac54\cdot\frac65=2$, contradicting $k\ge2$. So $a\in\{2,3\}$.

*Case $a=2$.* Then $abc-1=2bc-1$ is odd while $(a-1)(b-1)(c-1)=(b-1)(c-1)$, so $k$ is odd. The bound $k<\frac21\cdot\frac32\cdot\frac43=4$ gives $k=3$:
$$2bc-1=3(b-1)(c-1)\iff bc-3b-3c+4=0\iff (b-3)(c-3)=5 .$$
With $2<b<c$ this forces $b-3=1,\ c-3=5$, i.e. $(a,b,c)=(2,4,8)$.

*Case $a=3$.* Here $k<\frac32\cdot\frac43\cdot\frac54=\frac52$, so $k=2$:
$$3bc-1=4(b-1)(c-1)\iff bc-4b-4c+5=0\iff (b-4)(c-4)=11 .$$
As $11$ is prime and $3<b<c$: $b-4=1,\ c-4=11$, i.e. $(a,b,c)=(3,5,15)$.

*Check.* $(2,4,8)$: $\frac{64-1}{1\cdot3\cdot7}=\frac{63}{21}=3$. $(3,5,15)$: $\frac{225-1}{2\cdot4\cdot14}=\frac{224}{112}=2$. Both work.`,
  tags:["divisibility","bounding a ratio","factoring an equation"] },

"1994-1": { title:"The sum of a sum-closed set",
  statement: String.raw`Let $m,n$ be positive integers and let $a_{1},a_{2},\dots,a_{m}$ be distinct elements of $\{1,2,\dots,n\}$ such that whenever $a_{i}+a_{j}\le n$ for some $i,j$ (possibly $i=j$), there is an index $k$ with $a_{i}+a_{j}=a_{k}$. Prove that
$$\frac{a_{1}+a_{2}+\cdots+a_{m}}{m}\ \ge\ \frac{n+1}{2}.$$`,
  hints:[ String.raw`Order $a_1<a_2<\cdots<a_m$ and try to prove the pairwise bound $a_i+a_{m+1-i}\ge n+1$.`,
          String.raw`Suppose instead $a_i+a_{m+1-i}\le n$. Then all the sums $a_1+a_{m+1-i},\dots,a_i+a_{m+1-i}$ lie in the set.`,
          String.raw`These $i$ sums are distinct and strictly greater than $a_{m+1-i}$, yet only $i-1$ elements exceed $a_{m+1-i}$.`],
  solution: String.raw`Order the elements: $a_{1}<a_{2}<\cdots<a_{m}$.

*Key claim.* $a_{i}+a_{m+1-i}\ge n+1$ for every $i=1,\dots,m$.

Assume the contrary: $a_{i}+a_{m+1-i}\le n$ for some $i$. Consider the $i$ numbers
$$a_{1}+a_{m+1-i},\ a_{2}+a_{m+1-i},\ \dots,\ a_{i}+a_{m+1-i}.$$
Each is at most $a_{i}+a_{m+1-i}\le n$, so by hypothesis each belongs to $\{a_{1},\dots,a_{m}\}$. They are pairwise distinct (as $a_{1}<\cdots<a_{i}$) and all strictly greater than $a_{m+1-i}$. But the number of elements of the set exceeding $a_{m+1-i}$ is exactly
$$m-(m+1-i)=i-1<i,$$
a contradiction. Hence $a_{i}+a_{m+1-i}\ge n+1$.

*Finish.* Summing over $i=1,\dots,m$, each element is counted twice, so
$$2\sum_{i=1}^{m}a_{i}\ \ge\ m(n+1)\quad\Longrightarrow\quad \frac{1}{m}\sum_{i=1}^{m}a_{i}\ \ge\ \frac{n+1}{2}. \qquad\blacksquare$$`,
  tags:["pairing","pigeonhole principle","ordering"] },

"1995-2": { title:"An inequality with abc = 1",
  statement: String.raw`Let $a,b,c$ be positive real numbers with $abc=1$. Prove that
$$\frac{1}{a^{3}(b+c)}+\frac{1}{b^{3}(c+a)}+\frac{1}{c^{3}(a+b)}\ \ge\ \frac{3}{2}.$$`,
  hints:[ String.raw`Substitute $a=\frac1x,\ b=\frac1y,\ c=\frac1z$ (so $xyz=1$) and simplify each term.`,
          String.raw`The sum becomes $\dfrac{x^{2}}{y+z}+\dfrac{y^{2}}{z+x}+\dfrac{z^{2}}{x+y}$.`,
          String.raw`Apply Cauchy–Schwarz in Engel form, then AM–GM to $x+y+z$.`],
  solution: String.raw`Put $a=\frac1x$, $b=\frac1y$, $c=\frac1z$; the condition $abc=1$ becomes $xyz=1$. Then
$$\frac{1}{a^{3}(b+c)}=\frac{x^{3}}{\frac1y+\frac1z}=\frac{x^{3}yz}{y+z}=\frac{x^{2}\cdot xyz}{y+z}=\frac{x^{2}}{y+z}.$$
So we must prove
$$\frac{x^{2}}{y+z}+\frac{y^{2}}{z+x}+\frac{z^{2}}{x+y}\ \ge\ \frac32,\qquad xyz=1 .$$
By Cauchy–Schwarz in Engel form,
$$\sum \frac{x^{2}}{y+z}\ \ge\ \frac{(x+y+z)^{2}}{2(x+y+z)}=\frac{x+y+z}{2},$$
and by AM–GM $x+y+z\ge 3\sqrt[3]{xyz}=3$, so the sum is at least $\frac32$. Equality at $x=y=z=1$, i.e. $a=b=c=1$. $\blacksquare$`,
  tags:["substitution","Engel form","AM–GM"] },

"1998-4": { title:"ab² + b + 7 divides a²b + a + b",
  statement: String.raw`Determine all pairs $(a,b)$ of positive integers such that $ab^{2}+b+7$ divides $a^{2}b+a+b$.`,
  answer: String.raw`$(a,b)=(11,1)$, $(49,1)$ and $(7k^{2},7k)$ for any positive integer $k$.`,
  hints:[ String.raw`Eliminate $a$: consider the combination $b\left(a^{2}b+a+b\right)-a\left(ab^{2}+b+7\right)$.`,
          String.raw`It equals $b^{2}-7a$, so $ab^{2}+b+7\mid b^{2}-7a$. Split into three cases by the sign of $b^2-7a$.`,
          String.raw`If $b^{2}-7a>0$, compare sizes; if it is negative, deduce $b^{2}<7$, so $b\in\{1,2\}$.`],
  solution: String.raw`Let $N=ab^{2}+b+7$ divide $M=a^{2}b+a+b$. Then $N$ divides
$$bM-aN=b\left(a^{2}b+a+b\right)-a\left(ab^{2}+b+7\right)=b^{2}-7a. \tag{1}$$

*Case $b^{2}-7a=0$.* Then $b^{2}=7a$, so $7\mid b$: write $b=7k$, giving $a=7k^{2}$. Check:
$$N=7k^{2}\cdot49k^{2}+7k+7=343k^{4}+7k+7,\qquad M=49k^{4}\cdot 7k+7k^{2}+7k=k\left(343k^{4}+7k+7\right),$$
so $M=kN$ and the divisibility holds. All pairs $(7k^{2},7k)$ work.

*Case $b^{2}-7a>0$.* Then (1) forces $b^{2}-7a\ge N=ab^{2}+b+7>b^{2}$, impossible.

*Case $b^{2}-7a<0$.* Then $N\mid 7a-b^{2}$ with $7a-b^{2}>0$, so
$$ab^{2}+b+7\ \le\ 7a-b^{2}\ <\ 7a\ \Longrightarrow\ ab^{2}<7a\ \Longrightarrow\ b^{2}<7\ \Longrightarrow\ b\in\{1,2\}.$$

Sub-case $b=2$: $N=4a+9$ divides $7a-4$, hence it divides $4(7a-4)-7(4a+9)=-79$. As $79$ is prime, $4a+9=79$, i.e. $a=17.5$ — not an integer. No solutions.

Sub-case $b=1$: $N=a+8$ divides $7a-1$, hence it divides $7(a+8)-(7a-1)=57=3\cdot19$. Since $a+8\ge 9$, we get $a+8\in\{19,57\}$, i.e. $a=11$ or $a=49$. Check: for $a=11$, $N=19$ and $M=133=19\cdot 7$; for $a=49$, $N=57$ and $M=2451=57\cdot 43$. Both work.

Answer: $(11,1),\ (49,1)$ and $(7k^{2},7k)$, $k\in\mathbb{N}$.`,
  tags:["eliminating a variable","size estimates","divisibility"] },

"2000-2": { title:"A product at most one",
  statement: String.raw`Let $a,b,c$ be positive real numbers with $abc=1$. Prove that
$$\left(a-1+\frac{1}{b}\right)\left(b-1+\frac{1}{c}\right)\left(c-1+\frac{1}{a}\right)\ \le\ 1 .$$`,
  hints:[ String.raw`The substitution $a=\frac{x}{y},\ b=\frac{y}{z},\ c=\frac{z}{x}$ automatically gives $abc=1$.`,
          String.raw`After substituting, the inequality becomes $(x+z-y)(y+x-z)(z+y-x)\le xyz$.`,
          String.raw`If all three factors are positive, multiply three inequalities of the form $(x+z-y)(x+y-z)\le x^{2}$ (AM–GM). At most one factor can be negative.`],
  solution: String.raw`*Substitution.* Since $abc=1$ we may write $a=\frac{x}{y},\ b=\frac{y}{z},\ c=\frac{z}{x}$ with $x,y,z>0$. Then
$$a-1+\frac1b=\frac{x}{y}-1+\frac{z}{y}=\frac{x+z-y}{y},$$
and similarly for the other factors. The inequality becomes
$$\frac{(x+z-y)(y+x-z)(z+y-x)}{xyz}\le 1 \iff (x+z-y)(x+y-z)(y+z-x)\le xyz. \tag{*}$$

*Signs.* The sum of any two of the three factors is positive (for instance $(x+z-y)+(x+y-z)=2x>0$), so at most one of them is negative. If exactly one is negative, the left side of (*) is negative while the right side is positive, and the inequality holds. If one factor is zero, the left side is zero.

*Main case: all three factors positive.* By AM–GM,
$$(x+z-y)(x+y-z)\le\left(\frac{(x+z-y)+(x+y-z)}{2}\right)^{2}=x^{2},$$
and similarly $(x+y-z)(y+z-x)\le y^{2}$ and $(y+z-x)(x+z-y)\le z^{2}$. Multiplying the three (all sides non-negative),
$$\Big[(x+z-y)(x+y-z)(y+z-x)\Big]^{2}\le (xyz)^{2},$$
which gives (*). Equality holds for $x=y=z$, i.e. $a=b=c=1$. $\blacksquare$`,
  tags:["Ravi substitution","AM–GM","case analysis on signs"] },

"2001-1": { title:"The circumcentre angle and the altitude",
  statement: String.raw`Consider an acute-angled triangle $ABC$. Let $P$ be the foot of the altitude from $A$ and let $O$ be the circumcentre. Suppose that $\angle BCA\ \ge\ \angle ABC+30^{\circ}$. Prove that
$$\angle CAB+\angle COP\ <\ 90^{\circ}.$$`,
  hints:[ String.raw`Let $M$ be the midpoint of $BC$. Then $OM\perp BC$, $OM=R\cos\alpha$ and $\angle COM=\alpha$, where $\alpha=\angle CAB$.`,
          String.raw`Compute $MP$ in terms of the sides: $MP=\left|c\cos\beta-\frac a2\right|$, then simplify with the sine rule.`,
          String.raw`You get $MP=R\sin(\gamma-\beta)$, so $\tan\angle MOP=\frac{\sin(\gamma-\beta)}{\cos\alpha}$ and $\angle COP=\alpha-\angle MOP$. Reduce everything to $\cos 2\alpha+\sin\alpha>0$.`],
  solution: String.raw`Write $\alpha=\angle CAB$, $\beta=\angle ABC$, $\gamma=\angle BCA$, let $R$ be the circumradius and $M$ the midpoint of $BC$. The triangle is acute, so $O$ lies inside it and $P$ lies between $B$ and $C$.

*Step 1: where $P$ is relative to $M$.* We have $BP=c\cos\beta$ and $BM=\frac a2$, and by the sine rule $a=2R\sin\alpha$, $c=2R\sin\gamma$. Hence
$$BP-BM=2R\sin\gamma\cos\beta-R\sin\alpha=R\left(2\sin\gamma\cos\beta-\sin(\beta+\gamma)\right)=R\sin(\gamma-\beta),$$
since $\sin(\beta+\gamma)=\sin\gamma\cos\beta+\cos\gamma\sin\beta$. By hypothesis $\gamma-\beta\ge 30^{\circ}>0$, so $BP>BM$: the point $P$ lies between $M$ and $C$, and
$$MP=R\sin(\gamma-\beta).$$

*Step 2: angles at the centre.* The central angle $\angle BOC=2\alpha$, and $OM$ bisects it (because $OB=OC$ and $M$ is the midpoint of $BC$), so $\angle COM=\alpha$; also $OM=R\cos\alpha$. In the right triangle $OMP$,
$$\tan\angle MOP=\frac{MP}{OM}=\frac{\sin(\gamma-\beta)}{\cos\alpha}.$$
As $P$ lies between $M$ and $C$, the ray $OP$ lies inside the angle $MOC$, so
$$\angle COP=\angle COM-\angle MOP=\alpha-\angle MOP,$$
and the required inequality becomes
$$2\alpha-\angle MOP<90^{\circ}. \tag{1}$$

*Step 3: trigonometry.* If $2\alpha\le 90^{\circ}$, (1) is clear since $\angle MOP>0$. Suppose $2\alpha>90^{\circ}$. Then (1) is equivalent to $\angle MOP>2\alpha-90^{\circ}$, i.e. (both quantities lying in $(0^\circ,90^\circ)$)
$$\frac{\sin(\gamma-\beta)}{\cos\alpha}>\tan\left(2\alpha-90^{\circ}\right)=-\cot 2\alpha .$$
The triangle is acute, so $0<\gamma-\beta<90^{\circ}$, and from $\gamma-\beta\ge 30^{\circ}$ we get $\sin(\gamma-\beta)\ge\frac12$. It therefore suffices to prove
$$\frac{1}{2\cos\alpha}>-\frac{\cos 2\alpha}{\sin 2\alpha}.$$
Multiply by $\sin 2\alpha>0$ (as $0<2\alpha<180^{\circ}$) and use $\sin2\alpha=2\sin\alpha\cos\alpha$:
$$\sin\alpha>-\cos2\alpha\iff \cos2\alpha+\sin\alpha>0\iff 1-2\sin^{2}\alpha+\sin\alpha>0 .$$
With $s=\sin\alpha\in(0,1)$ this reads $2s^{2}-s-1<0$, i.e. $(2s+1)(s-1)<0$, true for $0<s<1$, i.e. for $0^\circ<\alpha<90^{\circ}$. $\blacksquare$`,
  tags:["sine rule","central angle","trigonometric inequality"] },

"2001-6": { title:"ab + cd is not prime",
  statement: String.raw`Let $a>b>c>d$ be positive integers satisfying
$$ac+bd=(b+d+a-c)(b+d-a+c).$$
Prove that $ab+cd$ is not prime.`,
  hints:[ String.raw`Expand the right-hand side as a difference of squares: the condition is equivalent to $a^{2}-ac+c^{2}=b^{2}+bd+d^{2}$.`,
          String.raw`Compare the three quantities $ab+cd$, $ac+bd$, $ad+bc$ in size: the differences factor.`,
          String.raw`Prove the identity $(ab+cd)(ad+bc)=(ac+bd)\left(a^{2}-ac+c^{2}\right)$ (it uses the hypothesis) and apply primality of $ab+cd$ to it.`],
  solution: String.raw`*Step 1: rewrite the condition.* The right-hand side is a difference of squares:
$$(b+d+a-c)(b+d-a+c)=(b+d)^{2}-(a-c)^{2},$$
so the condition is equivalent to
$$ac+bd=(b+d)^{2}-(a-c)^{2}\iff a^{2}-ac+c^{2}=b^{2}+bd+d^{2}. \tag{1}$$

*Step 2: ordering of the three quantities.* Since $a>b>c>d>0$:
$$(ab+cd)-(ac+bd)=a(b-c)-d(b-c)=(a-d)(b-c)>0,$$
$$(ac+bd)-(ad+bc)=a(c-d)-b(c-d)=(a-b)(c-d)>0,$$
hence
$$ab+cd\ >\ ac+bd\ >\ ad+bc\ >\ 0. \tag{2}$$

*Step 3: the key identity.* Expand:
$$(ab+cd)(ad+bc)=a^{2}bd+ab^{2}c+acd^{2}+bc^{2}d=bd\left(a^{2}+c^{2}\right)+ac\left(b^{2}+d^{2}\right).$$
By (1), $a^{2}+c^{2}=ac+\left(b^{2}+bd+d^{2}\right)$, so
$$(ab+cd)(ad+bc)=bd\left(ac+b^{2}+bd+d^{2}\right)+ac\left(b^{2}+d^{2}\right)=(ac+bd)\left(b^{2}+bd+d^{2}\right),$$
and, using (1) once more,
$$\boxed{(ab+cd)(ad+bc)=(ac+bd)\left(a^{2}-ac+c^{2}\right)} \tag{3}$$

*Step 4: finish.* Suppose $p=ab+cd$ is prime. By (2), $0<ac+bd<p$, so $p\nmid (ac+bd)$. But (3) says $p$ divides the product $(ac+bd)\left(a^{2}-ac+c^{2}\right)$, hence
$$p\ \mid\ a^{2}-ac+c^{2}.$$
The quantity $a^{2}-ac+c^{2}=\left(a-\frac c2\right)^{2}+\frac{3c^{2}}{4}$ is positive, so $a^{2}-ac+c^{2}=p\,m$ for some integer $m\ge 1$. Substituting into (3),
$$p\,(ad+bc)=(ac+bd)\,p\,m\ \Longrightarrow\ ad+bc=m\,(ac+bd)\ \ge\ ac+bd,$$
contradicting (2).

Therefore $ab+cd$ is composite. $\blacksquare$

*Check.* A search over all solutions of (1) with $a<200$ yields $6942$ quadruples; identity (3) holds for every one of them, and in none of them is $ab+cd$ prime.`,
  tags:["algebraic identity","primality","size estimates"] },

"2002-4": { title:"Sum of products of consecutive divisors",
  statement: String.raw`Let $n>1$ be an integer and let $d_{1}<d_{2}<\cdots<d_{k}=n$ be all of its positive divisors. Put
$$D=d_{1}d_{2}+d_{2}d_{3}+\cdots+d_{k-1}d_{k}.$$
(a) Prove that $D<n^{2}$.
(b) Determine all $n$ for which $D$ divides $n^{2}$.`,
  answer: String.raw`(b) exactly the primes $n$.`,
  hints:[ String.raw`Match each divisor $d$ with $n/d$: $d_{i}\,d_{k+1-i}=n$.`,
          String.raw`Hence $d_{j}d_{j+1}=\dfrac{n^{2}}{d_{k-j}d_{k+1-j}}$, so $D=n^{2}\sum_{j}\frac{1}{d_{j}d_{j+1}}$, and bound each term by $\frac{1}{d_j}-\frac{1}{d_{j+1}}$.`,
          String.raw`For (b): if $n$ is composite with smallest prime factor $p$, then $d_{k-1}=n/p$, so $D>\frac{n^{2}}{p}$. Which divisors of $n^2$ lie in $\left(\frac{n^2}{p},\,n^{2}\right)$?`],
  solution: String.raw`*(a)* Since $d_{i}d_{k+1-i}=n$ for every $i$,
$$\frac{1}{d_{j}d_{j+1}}=\frac{d_{k-j}d_{k+1-j}}{n^{2}},$$
so summing over $j=1,\dots,k-1$ in reverse order gives $D=n^{2}\sum_{j=1}^{k-1}\frac{1}{d_{j}d_{j+1}}$. Moreover, since $d_{j+1}-d_{j}\ge 1$,
$$\frac{1}{d_{j}d_{j+1}}\le \frac{d_{j+1}-d_{j}}{d_{j}d_{j+1}}=\frac{1}{d_{j}}-\frac{1}{d_{j+1}},$$
and the sum telescopes:
$$\sum_{j=1}^{k-1}\frac{1}{d_{j}d_{j+1}}\le \frac{1}{d_{1}}-\frac{1}{d_{k}}=1-\frac1n<1 .$$
Hence $D<n^{2}$.

*(b)* If $n=p$ is prime then $k=2$, $D=1\cdot p=p$ and $p\mid p^{2}$ — it works.

Let $n$ be composite with smallest prime factor $p$. The largest divisor below $n$ is $d_{k-1}=\frac np$, so
$$D\ \ge\ d_{k-1}d_{k}=\frac{n^{2}}{p},$$
with strict inequality because $D$ contains further positive terms ($k\ge 3$). Thus $\frac{n^{2}}{p}<D<n^{2}$.

But any divisor of $n^{2}$ strictly smaller than $n^{2}$ is at most $\frac{n^{2}}{q}$, where $q$ is the smallest prime factor of $n^{2}$, that is $q=p$. So $n^{2}$ has no divisor in the interval $\left(\frac{n^{2}}{p},\,n^{2}\right)$, and $D\nmid n^{2}$.

Answer: $D\mid n^{2}$ if and only if $n$ is prime.`,
  tags:["divisors","telescoping","smallest prime factor"] },

"2003-1": { title:"A hundred disjoint translates",
  statement: String.raw`Let $S=\{1,2,\dots,10^{6}\}$. Prove that for any subset $A\subset S$ with $101$ elements there exist $t_{1},t_{2},\dots,t_{100}\in S$ such that the sets
$$A_{j}=\{x+t_{j}:\ x\in A\},\qquad j=1,\dots,100,$$
are pairwise disjoint.`,
  hints:[ String.raw`When do $A+t_i$ and $A+t_j$ meet? Express the condition through the difference set $D=\{a-a':a,a'\in A\}$.`,
          String.raw`$|D\setminus\{0\}|\le 101\cdot 100=10100$. Choose the $t$'s one at a time (greedily) and count the forbidden values.`,
          String.raw`When choosing $t_{m+1}$, at most $m\cdot 10100$ values are forbidden; for $m\le 99$ that is below $10^{6}$.`],
  solution: String.raw`The sets $A+t_{i}$ and $A+t_{j}$ intersect precisely when $a+t_{i}=a'+t_{j}$ for some $a,a'\in A$, i.e. when
$$t_{i}-t_{j}\in D:=\{a-a':\ a,a'\in A\}.$$
The number of non-zero elements of $D$ is at most $101\cdot 100=10100$ (ordered pairs of distinct elements).

Build $t_{1},\dots,t_{100}$ greedily. Suppose $t_{1},\dots,t_{m}$ ($0\le m\le 99$) have been chosen with pairwise disjoint translates. A value $t\in S$ fails as $t_{m+1}$ only if $t\in t_{i}+\left(D\setminus\{0\}\right)$ for some $i\le m$ (the set $D$ is symmetric: with $d$ it contains $-d$). The number of such forbidden values is at most
$$m\cdot 10100\le 99\cdot 10100=999\,900<10^{6}=|S| .$$
So a valid $t_{m+1}\in S$ exists. Repeating the step $100$ times produces the required $t_{1},\dots,t_{100}$. $\blacksquare$

*Remark.* The margin is thin: $999\,900<1\,000\,000$. That is exactly why the numbers $101$ and $10^{6}$ appear in the statement.`,
  tags:["greedy algorithm","difference set","counting"] },

"2004-1": { title:"A common point of two circles on BC",
  statement: String.raw`Let $ABC$ be an acute-angled triangle with $AB\neq AC$. The circle with diameter $BC$ meets the sides $AB$ and $AC$ at $M$ and $N$ respectively. Let $O$ be the midpoint of $BC$. The bisectors of the angles $\angle BAC$ and $\angle MON$ intersect at $R$. Prove that the circumcircles of the triangles $BMR$ and $CNR$ have a common point lying on the side $BC$.`,
  hints:[ String.raw`Since $BC$ is a diameter, $\angle BMC=\angle BNC=90^{\circ}$: $M$ and $N$ are the feet of the altitudes from $C$ and $B$.`,
          String.raw`Let $X$ be the second intersection of $(BMR)$ and $(CNR)$. The condition "$X\in BC$" is equivalent to $\angle BXR+\angle RXC=180^{\circ}$, that is $\angle AMR+\angle ANR=180^{\circ}$ — which says $A,M,R,N$ are concyclic.`,
          String.raw`So it suffices to show $R$ lies on the circle $(AMN)$: note $OM=ON$, so the bisector of $\angle MON$ is the perpendicular bisector of $MN$.`],
  solution: String.raw`*Step 0.* As $BC$ is a diameter of the circle through $M$ and $N$, we have $\angle BMC=\angle BNC=90^{\circ}$, so $M$ and $N$ are the feet of the altitudes from $C$ and $B$. In particular $B,M,N,C$ lie on a circle with centre $O$, and $OM=ON=\frac{BC}{2}$.

*Step 1: it suffices to prove $R\in(AMN)$.* Let $X\ne R$ be the second intersection point of $(BMR)$ and $(CNR)$ (if they are tangent the argument is analogous). From $BMRX$ cyclic, $\angle BXR=180^{\circ}-\angle BMR$; from $CNRX$ cyclic, $\angle CXR=180^{\circ}-\angle CNR$. The point $X$ lies on line $BC$ exactly when $\angle BXR+\angle CXR=180^{\circ}$, i.e. when
$$\angle BMR+\angle CNR=180^{\circ}.$$
Since $\angle BMR=180^{\circ}-\angle AMR$ and $\angle CNR=180^{\circ}-\angle ANR$, this is equivalent to
$$\angle AMR+\angle ANR=180^{\circ},$$
that is, to $AMRN$ being cyclic.

*Step 2: $R$ is the arc midpoint of $MN$ in $(AMN)$.* Because $OM=ON$, the bisector of $\angle MON$ coincides with the perpendicular bisector of the segment $MN$. On the other hand, the bisector of $\angle MAN=\angle BAC$ meets the circle $(AMN)$ at the midpoint of the arc $MN$ not containing $A$, and that arc midpoint lies on the perpendicular bisector of the chord $MN$. So both bisectors pass through the arc midpoint, and their intersection point $R$ is exactly that midpoint. In particular $R$ lies on $(AMN)$.

By Step 1 the circles $(BMR)$ and $(CNR)$ meet at a point of line $BC$; acuteness guarantees that this point lies on the segment $BC$. $\blacksquare$`,
  tags:["cyclic quadrilaterals","arc midpoint","angle chasing"] },

"2004-2": { title:"A polynomial identity under ab+bc+ca=0",
  statement: String.raw`Find all polynomials $P(x)$ with real coefficients which satisfy
$$P(a-b)+P(b-c)+P(c-a)=2P(a+b+c)$$
for all real numbers $a,b,c$ with $ab+bc+ca=0$.`,
  answer: String.raw`$P(x)=\alpha x^{4}+\beta x^{2}$ with arbitrary real $\alpha,\beta$.`,
  hints:[ String.raw`Find a one-parameter family of triples with $ab+bc+ca=0$, for instance $(a,b,c)=(6t,3t,-2t)$.`,
          String.raw`For that family the condition reads $P(3t)+P(5t)+P(-8t)=2P(7t)$ for all $t$. Compare coefficients of $t^{n}$.`,
          String.raw`You get $3^{n}+5^{n}+(-8)^{n}=2\cdot 7^{n}$; check for which $n$ this holds, and separately verify that $x^{2}$ and $x^{4}$ work.`],
  solution: String.raw`*Necessity.* Take $(a,b,c)=(6t,3t,-2t)$: then
$$ab+bc+ca=18t^{2}-6t^{2}-12t^{2}=0 ,$$
while $a-b=3t$, $b-c=5t$, $c-a=-8t$ and $a+b+c=7t$. The condition gives
$$P(3t)+P(5t)+P(-8t)=2P(7t)\qquad\text{for all } t\in\mathbb{R}.$$
Write $P(x)=\sum_{n} c_{n}x^{n}$. Comparing coefficients of $t^{n}$, for every $n$ with $c_{n}\ne0$:
$$3^{n}+5^{n}+(-8)^{n}=2\cdot 7^{n}. \tag{1}$$
Checking (1):
- $n=0$: $3\ne 2$, so $c_{0}=0$;
- $n=1$: $3+5-8=0\ne 14$, so $c_{1}=0$;
- $n=2$: $9+25+64=98=2\cdot 49$ — holds;
- $n=3$: $27+125-512=-360\ne 686$, so $c_{3}=0$;
- $n=4$: $81+625+4096=4802=2\cdot 2401$ — holds;
- $n\ge 5$: for even $n$, $8^{n}>2\cdot 7^{n}$ (since $(8/7)^{n}>2$ for $n\ge 5$), so the left side is too big; for odd $n$ the left side is negative while the right side is positive. Hence $c_{n}=0$.

So $P(x)=\alpha x^{4}+\beta x^{2}$.

*Sufficiency.* Suppose $ab+bc+ca=0$. Then
$$(a-b)^{2}+(b-c)^{2}+(c-a)^{2}=2\left(a^{2}+b^{2}+c^{2}\right)-2(ab+bc+ca)=2\left(a^{2}+b^{2}+c^{2}\right),$$
$$2(a+b+c)^{2}=2\left(a^{2}+b^{2}+c^{2}+2(ab+bc+ca)\right)=2\left(a^{2}+b^{2}+c^{2}\right),$$
so $P(x)=x^{2}$ works. For $P(x)=x^{4}$, writing $s=a^{2}+b^{2}+c^{2}$, direct expansion using $ab+bc+ca=0$ gives
$$(a-b)^{4}+(b-c)^{4}+(c-a)^{4}=2s^{2}=2(a+b+c)^{4},$$
since $(a+b+c)^{2}=s$. So $x^{4}$ works too, and hence so does every linear combination.

Answer: $P(x)=\alpha x^{4}+\beta x^{2}$.`,
  tags:["polynomials","comparing coefficients","choosing a substitution"] },

"2005-1": { title:"An equilateral hexagon in an equilateral triangle",
  statement: String.raw`Six points are chosen on the sides of an equilateral triangle $ABC$: $A_{1},A_{2}$ on $BC$; $B_{1},B_{2}$ on $CA$; $C_{1},C_{2}$ on $AB$. These points are the vertices of a convex hexagon $A_{1}A_{2}B_{1}B_{2}C_{1}C_{2}$ with equal side lengths. Prove that the lines $A_{1}B_{2}$, $B_{1}C_{2}$ and $C_{1}A_{2}$ are concurrent.`,
  hints:[ String.raw`Write the traversal of the hexagon as a sum of six vectors equal to zero.`,
          String.raw`Three of them point along the sides of the triangle, and those three unit directions sum to zero. What does that say about the three "corner-cutting" sides?`,
          String.raw`Three equal vectors summing to zero make pairwise angles of $120^{\circ}$: the configuration is invariant under a $120^{\circ}$ rotation. Finish with complex numbers.`],
  solution: String.raw`*Step 1: the vector balance.* Let $s$ be the side of the hexagon. Traverse $A_{1}\to A_{2}\to B_{1}\to B_{2}\to C_{1}\to C_{2}\to A_{1}$. Three of its sides lie along the sides of the triangle: $A_{1}A_{2}=s\,u_{1}$ (along $BC$), $B_{1}B_{2}=s\,u_{2}$ (along $CA$), $C_{1}C_{2}=s\,u_{3}$ (along $AB$), where $u_{1},u_{2},u_{3}$ are the unit vectors of the sides in the order of traversal; for an equilateral triangle $u_{1}+u_{2}+u_{3}=0$. The other three sides cut corners: $A_{2}B_{1}=s\,w_{1}$, $B_{2}C_{1}=s\,w_{2}$, $C_{2}A_{1}=s\,w_{3}$ with $|w_{i}|=1$. The six vectors sum to zero, so
$$w_{1}+w_{2}+w_{3}=0 .$$
Three unit vectors with zero sum make pairwise angles of $120^{\circ}$.

*Step 2: symmetry.* Let $\rho$ be the $120^{\circ}$ rotation about the centre of the triangle taking $A\to B\to C\to A$; then $\rho(u_{1})=u_{2}$, $\rho(u_{2})=u_{3}$. Convexity of the hexagon forces the triple $(w_{1},w_{2},w_{3})$ to have the same orientation, i.e. $\rho(w_{1})=w_{2}$, $\rho(w_{2})=w_{3}$. Then the sequence of side vectors is invariant under a shift by two positions combined with $\rho$, and since the vertices lie on the sides of the triangle (which $\rho$ permutes), $\rho$ maps the hexagon onto itself:
$$\rho:\ A_{1}\mapsto B_{1},\ A_{2}\mapsto B_{2},\ B_{1}\mapsto C_{1},\ B_{2}\mapsto C_{2},\ C_{1}\mapsto A_{1},\ C_{2}\mapsto A_{2}.$$
In particular $\rho$ takes the line $A_{1}B_{2}$ to $B_{1}C_{2}$ and that one to $C_{1}A_{2}$.

*Step 3: a main diagonal passes through the centre.* Place the centre at $0$ and use complex numbers; $\rho$ is multiplication by $\omega=e^{2\pi i/3}$. Put $v_{1}=A_{1}$, $v_{2}=A_{2}$; then $B_{1}=\omega v_{1}$, $B_{2}=\omega v_{2}$, and the equality of sides $|A_{1}A_{2}|=|A_{2}B_{1}|$ reads
$$|v_{2}-v_{1}|=|\omega v_{1}-v_{2}| ,$$
i.e. $v_{2}$ is equidistant from $v_{1}$ and $\omega v_{1}$. Multiplying by $|\omega|=1$, the point $\omega v_{2}$ is equidistant from $\omega v_{1}$ and $\omega^{2}v_{1}$. Since $|\omega v_{1}|=|\omega^{2}v_{1}|$, the perpendicular bisector of $[\omega v_{1},\omega^{2}v_{1}]$ passes through $0$ with direction $\omega v_{1}+\omega^{2}v_{1}=-v_{1}$ (because $1+\omega+\omega^{2}=0$) — it is precisely the line through $0$ and $v_{1}$.

Hence $0$, $v_{1}=A_{1}$ and $\omega v_{2}=B_{2}$ are collinear: the diagonal $A_{1}B_{2}$ passes through the centre. Applying $\rho$, the same holds for $B_{1}C_{2}$ and $C_{1}A_{2}$.

So all three lines pass through the centre of the equilateral triangle and are therefore concurrent. $\blacksquare$`,
  tags:["vectors","rotational symmetry","complex numbers"] },

"2005-3": { title:"An inequality with fifth powers",
  statement: String.raw`Let $x,y,z$ be positive real numbers with $xyz\ge 1$. Prove that
$$\frac{x^{5}-x^{2}}{x^{5}+y^{2}+z^{2}}+\frac{y^{5}-y^{2}}{y^{5}+z^{2}+x^{2}}+\frac{z^{5}-z^{2}}{z^{5}+x^{2}+y^{2}}\ \ge\ 0 .$$`,
  hints:[ String.raw`Note that $\dfrac{x^{5}-x^{2}}{x^{5}+y^{2}+z^{2}}=1-\dfrac{x^{2}+y^{2}+z^{2}}{x^{5}+y^{2}+z^{2}}$.`,
          String.raw`The inequality becomes equivalent to $\sum\dfrac{1}{x^{5}+y^{2}+z^{2}}\le\dfrac{3}{x^{2}+y^{2}+z^{2}}$.`,
          String.raw`Apply Cauchy–Schwarz: $\left(x^{5}+y^{2}+z^{2}\right)\left(\frac1x+y^{2}+z^{2}\right)\ge\left(x^{2}+y^{2}+z^{2}\right)^{2}$, then use $xyz\ge1$.`],
  solution: String.raw`Write $S=x^{2}+y^{2}+z^{2}$. Since
$$\frac{x^{5}-x^{2}}{x^{5}+y^{2}+z^{2}}=\frac{\left(x^{5}+y^{2}+z^{2}\right)-S}{x^{5}+y^{2}+z^{2}}=1-\frac{S}{x^{5}+y^{2}+z^{2}},$$
the inequality is equivalent to
$$\sum_{\text{cyc}}\frac{1}{x^{5}+y^{2}+z^{2}}\ \le\ \frac{3}{S}. \tag{1}$$

By Cauchy–Schwarz,
$$\left(x^{5}+y^{2}+z^{2}\right)\left(\frac{1}{x}+y^{2}+z^{2}\right)\ \ge\ \left(x^{2}+y^{2}+z^{2}\right)^{2}=S^{2},$$
so
$$\frac{1}{x^{5}+y^{2}+z^{2}}\ \le\ \frac{\frac1x+y^{2}+z^{2}}{S^{2}} .$$
Summing cyclically,
$$\sum\frac{1}{x^{5}+y^{2}+z^{2}}\ \le\ \frac{\left(\frac1x+\frac1y+\frac1z\right)+2S}{S^{2}} .$$
Hence for (1) it is enough that
$$\left(\frac1x+\frac1y+\frac1z\right)+2S\ \le\ 3S\iff \frac1x+\frac1y+\frac1z\ \le\ x^{2}+y^{2}+z^{2}.$$
This holds: from $xyz\ge1$,
$$\frac1x+\frac1y+\frac1z=\frac{xy+yz+zx}{xyz}\le xy+yz+zx\le x^{2}+y^{2}+z^{2},$$
the last step being a standard consequence of AM–GM. $\blacksquare$`,
  tags:["Cauchy–Schwarz","rewriting fractions","AM–GM"] },

"2005-4": { title:"Coprime to the whole sequence",
  statement: String.raw`Determine all positive integers relatively prime to every term of the infinite sequence
$$a_{n}=2^{n}+3^{n}+6^{n}-1,\qquad n\ge 1 .$$`,
  answer: String.raw`Only $1$.`,
  hints:[ String.raw`It is enough to show that every prime $p$ divides some term of the sequence.`,
          String.raw`Handle the small primes by hand: $a_{1}=10$, $a_{2}=48$.`,
          String.raw`For $p\ge 5$ take $n=p-2$ and use Fermat's little theorem: $2^{p-2}\equiv \frac12$, $3^{p-2}\equiv\frac13$, $6^{p-2}\equiv\frac16 \pmod p$.`],
  solution: String.raw`We show every prime $p$ divides some term; then the only number coprime to all $a_{n}$ is $1$.

$p=2$ and $p=5$: $a_{1}=2+3+6-1=10$ is divisible by $2$ and by $5$.
$p=3$: $a_{2}=4+9+36-1=48$ is divisible by $3$.

Let $p\ge 5$ and take $n=p-2\ge 3$. By Fermat's little theorem $2^{p-1}\equiv 3^{p-1}\equiv 6^{p-1}\equiv 1\pmod p$, so in $\mathbb{Z}/p$
$$2^{p-2}\equiv 2^{-1},\qquad 3^{p-2}\equiv 3^{-1},\qquad 6^{p-2}\equiv 6^{-1}.$$
Therefore
$$a_{p-2}\equiv 2^{-1}+3^{-1}+6^{-1}-1\pmod p .$$
Multiplying by $6$ (invertible since $p\ge5$),
$$6\,a_{p-2}\equiv 3+2+1-6=0 \pmod p,$$
so $p\mid a_{p-2}$.

Thus every prime divides some term, and the answer is: the only such positive integer is $1$. $\blacksquare$`,
  tags:["Fermat's little theorem","inverses","all primes"] }

});
