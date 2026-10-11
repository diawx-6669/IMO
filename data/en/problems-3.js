window.IMO_L10N = window.IMO_L10N || {};
window.IMO_L10N.en = window.IMO_L10N.en || { problems: {}, tech: {} };
Object.assign(window.IMO_L10N.en.problems, {

"2006-1": { title:"AP is at least AI",
  statement: String.raw`Let $ABC$ be a triangle with incentre $I$. A point $P$ in the interior of the triangle satisfies
$$\angle PBA+\angle PCA=\angle PBC+\angle PCB .$$
Show that $AP\ge AI$, and that equality holds if and only if $P=I$.`,
  hints:[ String.raw`Add all four angles in the hypothesis: what is their sum?`,
          String.raw`The condition gives $\angle PBC+\angle PCB=\frac{\beta+\gamma}{2}$, i.e. $\angle BPC=90^{\circ}+\frac{\alpha}{2}=\angle BIC$: so $P$ lies on the circle $(BIC)$.`,
          String.raw`The centre of $(BIC)$ is the arc midpoint $M$ of $BC$ on the circumcircle (the incentre–arc-midpoint lemma), and $MB=MI=MC$. Apply the triangle inequality to $A$, $M$, $P$.`],
  solution: String.raw`Write $\alpha,\beta,\gamma$ for the angles of the triangle.

*Step 1.* The four angles in the hypothesis add up to $\angle B+\angle C=\beta+\gamma$, and the hypothesis says the two sides are equal, so
$$\angle PBC+\angle PCB=\frac{\beta+\gamma}{2}\quad\Longrightarrow\quad \angle BPC=180^{\circ}-\frac{\beta+\gamma}{2}=90^{\circ}+\frac{\alpha}{2}.$$
On the other hand $\angle BIC=90^{\circ}+\frac{\alpha}{2}$ for the incentre. So $P$ lies on the same arc of the circle through $B$, $I$, $C$ as $I$ does.

*Step 2 (incentre–arc-midpoint lemma).* Let $M$ be the midpoint of the arc $BC$ of the circumcircle not containing $A$. Then $MB=MI=MC$, so $M$ is the centre of the circle $(BIC)$, whose radius is $MI$.

*Step 3.* The points $A$, $I$, $M$ are collinear (the bisector from $A$), with $I$ between $A$ and $M$. Since $MP=MI$ (both are radii of $(BIC)$), the triangle inequality for $A,M,P$ gives
$$AP\ \ge\ AM-MP=AM-MI=AI .$$
Equality forces $P$ to lie on the segment $AM$, i.e. $P$ is the intersection of $AM$ with the circle $(BIC)$, that is $P=I$. $\blacksquare$`,
  tags:["incentre–arc-midpoint lemma","inscribed angles","triangle inequality"] },

"2006-3": { title:"The least constant M",
  statement: String.raw`Determine the least real number $M$ such that the inequality
$$\left|ab\left(a^{2}-b^{2}\right)+bc\left(b^{2}-c^{2}\right)+ca\left(c^{2}-a^{2}\right)\right|\ \le\ M\left(a^{2}+b^{2}+c^{2}\right)^{2}$$
holds for all real numbers $a,b,c$.`,
  answer: String.raw`$M=\dfrac{9\sqrt{2}}{32}\approx 0.3977$.`,
  hints:[ String.raw`The left-hand side factors. Test the identity on a few triples and guess the factors.`,
          String.raw`The identity is $ab(a^{2}-b^{2})+bc(b^{2}-c^{2})+ca(c^{2}-a^{2})=(a+b+c)(a-b)(b-c)(a-c)$.`,
          String.raw`Assuming $a\ge b\ge c$, set $u=a-b\ge0$, $v=b-c\ge0$, $p=a+b+c$ and use $a^{2}+b^{2}+c^{2}=\frac{2}{3}\left(u^{2}+uv+v^{2}\right)+\frac{p^{2}}{3}$. Then AM–GM in $u,v$ and optimise in $p$.`],
  solution: String.raw`*Step 1: factorisation.* One has the identity
$$ab\left(a^{2}-b^{2}\right)+bc\left(b^{2}-c^{2}\right)+ca\left(c^{2}-a^{2}\right)=(a+b+c)(a-b)(b-c)(a-c).$$
(Verified by expanding; for example at $(a,b,c)=(2,1,0)$ both sides equal $6$.)

*Step 2: normalisation.* The expression is antisymmetric, so we may assume $a\ge b\ge c$ (a transposition only changes the sign). Put
$$u=a-b\ge 0,\qquad v=b-c\ge 0,\qquad p=a+b+c .$$
Then $(a-b)(b-c)(a-c)=uv(u+v)$, and a direct computation gives
$$a^{2}+b^{2}+c^{2}=\frac{2}{3}\left(u^{2}+uv+v^{2}\right)+\frac{p^{2}}{3}.$$
We must maximise
$$F=\frac{|p|\,uv(u+v)}{\left(\frac{2}{3}\left(u^{2}+uv+v^{2}\right)+\frac{p^{2}}{3}\right)^{2}} .$$

*Step 3: optimisation.* For a fixed sum $u+v=s$ the product $uv$ is largest at $u=v=\frac s2$, and the denominator is then smallest (since $u^{2}+uv+v^{2}=s^{2}-uv$ decreases in $uv$), so the maximum occurs at $u=v$. Put $u=v=t$:
$$F=\frac{|p|\cdot 2t^{3}}{\left(2t^{2}+\frac{p^{2}}{3}\right)^{2}} .$$
Maximising over $p$ for fixed $t$ gives $p^{2}=2t^{2}$, i.e. $|p|=t\sqrt2$, and then
$$F=\frac{t\sqrt2\cdot 2t^{3}}{\left(2t^{2}+\frac{2t^{2}}{3}\right)^{2}}=\frac{2\sqrt2\,t^{4}}{\left(\frac{8t^{2}}{3}\right)^{2}}=\frac{2\sqrt2\,t^{4}\cdot 9}{64\,t^{4}}=\frac{9\sqrt2}{32}.$$

So $M=\frac{9\sqrt2}{32}$: the inequality holds with this constant and the constant is attained (take $u=v=t$ and $p=t\sqrt2$, which determines a concrete triple $a\ge b\ge c$ with equality).

Answer: $M=\dfrac{9\sqrt{2}}{32}$.`,
  tags:["factorisation","normalisation","constrained optimisation"] },

"2006-5": { title:"Fixed points of iterates",
  statement: String.raw`Let $P(x)$ be a polynomial of degree $n>1$ with integer coefficients and let $k$ be a positive integer. Consider
$$Q(x)=\underbrace{P(P(\cdots P(x)\cdots))}_{k\ \text{times}} .$$
Prove that there are at most $n$ integers $t$ with $Q(t)=t$.`,
  hints:[ String.raw`For integers $x,y$ the difference $x-y$ divides $P(x)-P(y)$. What does that give for the orbit $t\to P(t)\to P(P(t))\to\cdots$?`,
          String.raw`If $Q(t)=t$ then $t$ lies in a cycle of $P$. Show all consecutive differences in the cycle have the same absolute value, and deduce that the cycle length is $1$ or $2$.`,
          String.raw`So every such $t$ satisfies $P(P(t))=t$. Split into two cases: either all of them are fixed points of $P$ (roots of $P(x)-x$), or there is a 2-cycle — and then all of them are roots of $P(x)+x-C$ for a suitable constant $C$.`],
  solution: String.raw`*Step 1: orbits.* Let $Q(t)=t$ for an integer $t$. Put $t_{0}=t$, $t_{i+1}=P(t_{i})$; then $t_{k}=t_{0}$, so $t$ lies in a cycle. Write $d_{i}=t_{i+1}-t_{i}$ (indices modulo the cycle length). For integers,
$$(x-y)\mid \left(P(x)-P(y)\right),$$
so $d_{i}\mid d_{i+1}$ for all $i$. By cyclicity $d_{0}\mid d_{1}\mid\cdots\mid d_{0}$, so all $|d_{i}|$ equal one number $d>0$ (if $d=0$ then $t$ is a fixed point of $P$).

*Step 2: the cycle length is at most $2$.* Suppose the length is $\ell\ge 3$. All $|d_i|$ equal $d$ and $\sum_{i=0}^{\ell-1}d_{i}=0$, so both $+d$ and $-d$ occur among the $d_{i}$. Hence there are neighbouring indices with $d_{i}=d$, $d_{i+1}=-d$, i.e. $t_{i+2}=t_{i}$ — a 2-cycle inside a cycle of length $\ell\ge3$, impossible since cycle elements are distinct. So $\ell\le 2$.

Thus every integer $t$ with $Q(t)=t$ satisfies $P(P(t))=t$.

*Step 3: counting.* Let $S=\{t\in\mathbb{Z}:\ Q(t)=t\}$.

Case 1: all elements of $S$ are fixed points of $P$. Then they are roots of $P(x)-x$, a polynomial of degree $n$, so $|S|\le n$.

Case 2: some $t_{0}\in S$ has $P(t_{0})=u\ne t_{0}$ and $P(u)=t_{0}$. Put $C=t_{0}+u$. For any $s\in S$ set $v=P(s)$. Step 1 applied to the relevant pairs gives
$$\left|s-t_{0}\right|=\left|v-u\right|,\qquad \left|s-u\right|=\left|v-t_{0}\right| .$$
Examining the signs shows that either $s+v=C$, or $s=t_{0},\,v=u$, or $s=u,\,v=t_{0}$ — and the last two also give $s+v=C$. So every $s\in S$ is a root of
$$P(x)+x-C,$$
a polynomial of degree $n$ (since $n>1$). Hence $|S|\le n$. $\blacksquare$`,
  tags:["integer polynomials","cycles","divisibility of differences"] },

"2007-1": { title:"Approximation by a non-decreasing sequence",
  statement: String.raw`Real numbers $a_{1},a_{2},\dots,a_{n}$ are given. For each $i$ put
$$d_{i}=\max\{a_{j}:1\le j\le i\}-\min\{a_{j}:i\le j\le n\},$$
and let $d=\max\{d_{i}:1\le i\le n\}$.
(a) Prove that for any real numbers $x_{1}\le x_{2}\le\cdots\le x_{n}$,
$$\max\left\{\left|x_{i}-a_{i}\right|:1\le i\le n\right\}\ \ge\ \frac{d}{2}.$$
(b) Show that there are real numbers $x_{1}\le x_{2}\le\cdots\le x_{n}$ for which equality holds in (a).`,
  hints:[ String.raw`For (a) pick indices $p\le q$ at which $d$ is attained: $d=a_{p}-a_{q}$ with $p\le q$.`,
          String.raw`Add $|x_{p}-a_{p}|+|x_{q}-a_{q}|$ and use $x_{p}\le x_{q}$.`,
          String.raw`For (b) try $x_{i}=M_{i}-\frac d2$, where $M_{i}=\max\{a_{j}:j\le i\}$.`],
  solution: String.raw`Write $M_{i}=\max\{a_{j}:j\le i\}$ and $m_{i}=\min\{a_{j}:j\ge i\}$, so that $d_{i}=M_{i}-m_{i}$.

*(a)* Let $d=d_{i_{0}}$ with $M_{i_{0}}=a_{p}$ for some $p\le i_{0}$ and $m_{i_{0}}=a_{q}$ for some $q\ge i_{0}$. Then $p\le q$ and $a_{p}-a_{q}=d$. Since $x_{p}\le x_{q}$,
$$\left|x_{p}-a_{p}\right|+\left|x_{q}-a_{q}\right|\ \ge\ \left(a_{p}-x_{p}\right)+\left(x_{q}-a_{q}\right)\ \ge\ a_{p}-a_{q}=d .$$
So at least one of the two terms is at least $\frac d2$, whence $\max_i|x_{i}-a_{i}|\ge\frac d2$.

*(b)* Put $x_{i}=M_{i}-\frac d2$. The sequence $M_{i}$ is non-decreasing, hence so is $x_{i}$. Estimate the deviation:
- $x_{i}-a_{i}=M_{i}-a_{i}-\frac d2\ge -\frac d2$, since $M_{i}\ge a_{i}$;
- $x_{i}-a_{i}=M_{i}-a_{i}-\frac d2\le M_{i}-m_{i}-\frac d2=d_{i}-\frac d2\le \frac d2$, since $a_{i}\ge m_{i}$ and $d_{i}\le d$.

So $|x_{i}-a_{i}|\le\frac d2$ for every $i$, and together with (a) this gives $\max_i|x_{i}-a_{i}|=\frac d2$. $\blacksquare$`,
  tags:["maxima and minima","triangle inequality","explicit construction"] },

"2007-3": { title:"Two rooms and cliques",
  statement: String.raw`In a mathematical competition some competitors are friends; friendship is mutual. Call a group of competitors a clique if any two of them are friends (in particular, any group of fewer than two competitors is a clique). The size of a clique is the number of its members.

Given that the largest size of a clique is even, prove that the competitors can be arranged into two rooms so that the largest size of a clique contained in one room equals the largest size of a clique contained in the other.`,
  hints:[ String.raw`Let the largest clique have size $2m$. Start from a partition in which one room contains exactly half of some maximum clique.`,
          String.raw`Write $c(A)$, $c(B)$ for the largest clique sizes in the two rooms. Consider a partition minimising $|c(A)-c(B)|$ (with extra tie-breaking) and assume $c(A)>c(B)$.`,
          String.raw`Moving a suitable competitor from $A$ to $B$ decreases $c(A)$ by one and increases $c(B)$ by at most one — this contradicts minimality.`],
  solution: String.raw`*Outline.* Let a maximum clique $M$ have size $2m$.

1. Consider all partitions of the competitors into rooms $A$ and $B$, and write $c(A)$, $c(B)$ for the largest clique sizes inside the rooms. Always $\max(c(A),c(B))\ge m$, since the clique $M$ is split between the rooms.

2. Among all partitions in which $A$ contains a clique of size $c(A)$, choose one minimising $c(A)$ (breaking ties by maximising $c(B)$). Assume $c(A)>c(B)$, otherwise we are done.

3. Take a maximum clique $K\subseteq A$, $|K|=c(A)$, and move one of its members to room $B$. Then $c(A)$ drops by at least one (the clique $K$ is destroyed; one must check that no other clique of the same size appears — this is the key technical point, handled by choosing the moved member carefully), while $c(B)$ grows by at most one. Repeating the moves we either reach $c(A)=c(B)$ or contradict the minimality of the chosen partition.

Writing this out in full takes about a page: one has to handle the case where the move immediately enlarges the clique in $B$, and to use the evenness of $2m$. Evenness is essential: for an odd maximum clique size the statement is false.`,
  tags:["extremal principle","local moves","graphs and cliques"] },

"2007-5": { title:"Divisibility forces a = b",
  statement: String.raw`Let $a$ and $b$ be positive integers. Show that if $4ab-1$ divides $\left(4a^{2}-1\right)^{2}$, then $a=b$.`,
  hints:[ String.raw`Work modulo $4ab-1$, where $4ab\equiv 1$. What is $b\left(4a^{2}-1\right)$ congruent to?`,
          String.raw`You get $b(4a^{2}-1)\equiv a-b$, so the condition is equivalent to $4ab-1\mid (a-b)^{2}$.`,
          String.raw`Apply Vieta jumping: fix $k=\frac{(a-b)^{2}}{4ab-1}$ and take the solution with the smallest sum $a+b$.`],
  solution: String.raw`*Step 1: reformulation.* Modulo $N=4ab-1$ we have $4ab\equiv 1$, hence
$$b\left(4a^{2}-1\right)=a\cdot 4ab-b\equiv a-b \pmod N .$$
Therefore $b^{2}\left(4a^{2}-1\right)^{2}\equiv (a-b)^{2}\pmod N$. Since $\gcd(b,N)=1$ (because $4ab\equiv1$),
$$N\mid \left(4a^{2}-1\right)^{2}\iff N\mid (a-b)^{2}. \tag{1}$$

*Step 2: Vieta jumping.* Suppose some $a\ne b$ satisfy $4ab-1\mid(a-b)^{2}$, and set
$$k=\frac{(a-b)^{2}}{4ab-1}\in\mathbb{N}.$$
Fix $k$ and choose, among all pairs of positive integers with
$$(a-b)^{2}=k(4ab-1), \tag{2}$$
one with the smallest sum $a+b$; we may assume $a>b$ (if $a=b$ the left side is zero while the right side is positive, impossible, so $a\ne b$).

Rewrite (2) as a quadratic in $a$:
$$a^{2}-\left(2b+4kb\right)a+\left(b^{2}+k\right)=0 .$$
By Vieta's formulas the other root is
$$a'=2b+4kb-a=\frac{b^{2}+k}{a}.$$
The first expression shows $a'$ is an integer, the second that $a'>0$. So $(a',b)$ is again a solution of (2) in positive integers.

Now estimate $a'$. From (2), $a^{2}-2ab+b^{2}=4kab-k$, i.e. $a^{2}=2ab-b^{2}+4kab-k>b^{2}+k$ for $a>b\ge1$, $k\ge1$. Hence
$$a'=\frac{b^{2}+k}{a}<a,$$
so $a'+b<a+b$, contradicting minimality. Therefore (2) has no solution with $a\ne b$, and by (1) we conclude $a=b$. $\blacksquare$`,
  tags:["Vieta jumping","working modulo N","minimal solution"] },

"2008-1": { title:"Six points on one circle",
  statement: String.raw`Let $H$ be the orthocentre of an acute-angled triangle $ABC$. The circle $\Gamma_{A}$ centred at the midpoint of $BC$ and passing through $H$ meets the line $BC$ at points $A_{1}$ and $A_{2}$. Define $B_{1},B_{2}$ (on line $CA$) and $C_{1},C_{2}$ (on line $AB$) similarly. Prove that the six points $A_{1},A_{2},B_{1},B_{2},C_{1},C_{2}$ lie on one circle.`,
  hints:[ String.raw`The natural candidate for the centre is the circumcentre $O$. One must show $OA_{1}=OB_{1}=OC_{1}=\dots$`,
          String.raw`Let $M_{A}$ be the midpoint of $BC$. Then $OM_{A}\perp BC$, so $OA_{1}^{2}=OM_{A}^{2}+M_{A}A_{1}^{2}=OM_{A}^{2}+M_{A}H^{2}$.`,
          String.raw`Put $O$ at the origin: then $H=\vec A+\vec B+\vec C$ and $M_{A}=\frac{\vec B+\vec C}{2}$. Substitute and simplify.`],
  solution: String.raw`Place the circumcentre $O$ at the origin and write $\vec A,\vec B,\vec C$ for the position vectors of the vertices, $|\vec A|=|\vec B|=|\vec C|=R$. It is classical that $\vec H=\vec A+\vec B+\vec C$.

Let $M_{A}=\frac{\vec B+\vec C}{2}$ be the midpoint of $BC$. Since $OM_{A}\perp BC$ and $A_{1},A_{2}$ lie on line $BC$ at distance $M_{A}H$ from $M_{A}$ (that is the radius of $\Gamma_{A}$), Pythagoras gives
$$OA_{1}^{2}=OA_{2}^{2}=OM_{A}^{2}+M_{A}H^{2}.$$
Compute both terms:
$$OM_{A}^{2}=\frac{\left|\vec B+\vec C\right|^{2}}{4}=\frac{2R^{2}+2\,\vec B\cdot\vec C}{4},$$
$$M_{A}H^{2}=\left|\vec A+\vec B+\vec C-\frac{\vec B+\vec C}{2}\right|^{2}=\left|\vec A+\frac{\vec B+\vec C}{2}\right|^{2}=R^{2}+\frac{2R^{2}+2\,\vec B\cdot\vec C}{4}+\vec A\cdot\left(\vec B+\vec C\right).$$
Adding,
$$OA_{1}^{2}=R^{2}+\frac{2R^{2}+2\,\vec B\cdot\vec C}{2}+\vec A\cdot\vec B+\vec A\cdot\vec C=2R^{2}+\left(\vec A\cdot\vec B+\vec B\cdot\vec C+\vec C\cdot\vec A\right).$$
The result is symmetric in $\vec A,\vec B,\vec C$, so the same value comes out for $OB_{1}^{2}=OB_{2}^{2}$ and $OC_{1}^{2}=OC_{2}^{2}$.

Hence all six points are equidistant from $O$ and lie on one circle, of radius
$$\sqrt{2R^{2}+\vec A\cdot\vec B+\vec B\cdot\vec C+\vec C\cdot\vec A}. \qquad\blacksquare$$`,
  tags:["vector method","orthocentre","Pythagoras"] },

"2008-2": { title:"A sum of squared fractions is at least one",
  statement: String.raw`(a) Prove that
$$\frac{x^{2}}{(x-1)^{2}}+\frac{y^{2}}{(y-1)^{2}}+\frac{z^{2}}{(z-1)^{2}}\ \ge\ 1$$
for all real numbers $x,y,z$, each different from $1$, with $xyz=1$.

(b) Prove that equality holds for infinitely many triples of rational numbers $x,y,z$.`,
  hints:[ String.raw`Substitute $a=\frac{x}{x-1}$, $b=\frac{y}{y-1}$, $c=\frac{z}{z-1}$ and express $x$ through $a$.`,
          String.raw`The condition $xyz=1$ turns into $abc=(a-1)(b-1)(c-1)$, that is $ab+bc+ca=a+b+c-1$.`,
          String.raw`Then $a^{2}+b^{2}+c^{2}=(a+b+c)^{2}-2(ab+bc+ca)=(a+b+c-1)^{2}+1$.`],
  solution: String.raw`*(a)* Put
$$a=\frac{x}{x-1},\quad b=\frac{y}{y-1},\quad c=\frac{z}{z-1}\qquad\Longrightarrow\qquad x=\frac{a}{a-1},\ y=\frac{b}{b-1},\ z=\frac{c}{c-1}.$$
The condition $xyz=1$ gives
$$abc=(a-1)(b-1)(c-1)=abc-(ab+bc+ca)+(a+b+c)-1,$$
that is
$$ab+bc+ca=a+b+c-1. \tag{1}$$
With $s=a+b+c$,
$$\frac{x^{2}}{(x-1)^{2}}+\frac{y^{2}}{(y-1)^{2}}+\frac{z^{2}}{(z-1)^{2}}=a^{2}+b^{2}+c^{2}=s^{2}-2(ab+bc+ca)\overset{(1)}{=}s^{2}-2s+2=(s-1)^{2}+1\ \ge\ 1 .$$

*(b)* Equality holds exactly when $s=a+b+c=1$, and then (1) gives $ab+bc+ca=0$. We need infinitely many rational triples with
$$a+b+c=1,\qquad ab+bc+ca=0 .$$
Take rational $a$ as a parameter; then $b+c=1-a$ and $bc=-a(b+c)=-a(1-a)$, so $b,c$ are the roots of
$$T^{2}-(1-a)T-a(1-a)=0,\qquad \Delta=(1-a)^{2}+4a(1-a)=(1-a)(1+3a).$$
Thus $b,c$ are rational exactly when $(1-a)(1+3a)$ is the square of a rational. There are infinitely many such rational $a$: the equation $w^{2}=(1-a)(1+3a)$ defines a conic with the rational point $(a,w)=(1,0)$, and drawing lines of rational slope through it produces an infinite family of rational solutions. For each such $a$ the numbers
$$x=\frac{a}{a-1},\quad y=\frac{b}{b-1},\quad z=\frac{c}{c-1}$$
are rational (one only needs $a,b,c\ne1$, which fails for at most finitely many parameter values), satisfy $xyz=1$, and give equality. $\blacksquare$`,
  tags:["substitution","symmetric functions","rational points on a conic"] },

"2008-3": { title:"A large prime divisor of n²+1",
  statement: String.raw`Prove that there exist infinitely many positive integers $n$ such that $n^{2}+1$ has a prime divisor greater than $2n+\sqrt{2n}$.`,
  hints:[ String.raw`For a prime $p\equiv 1\pmod 8$ the number $-1$ is a quadratic residue: there is $n$ with $p\mid n^{2}+1$ and $n\le \frac{p-1}{2}$.`,
          String.raw`Write $p=2n+k$ with $k\ge 1$ and substitute $n=\frac{p-k}{2}$ into $n^{2}+1$ modulo $p$.`,
          String.raw`You get $p\mid k^{2}+4$, hence $k^{2}+4\ge p=2n+k$, so $k$ is of order $\sqrt{2n}$.`],
  solution: String.raw`Let $p$ be a prime with $p\equiv 1\pmod 8$ (there are infinitely many by Dirichlet's theorem; the elementary fact that infinitely many primes divide numbers $m^{2}+1$, all of them $\equiv1\pmod4$, also suffices).

Since $p\equiv 1 \pmod 4$, $-1$ is a quadratic residue modulo $p$: there is $n$ with
$$p\mid n^{2}+1,\qquad 1\le n\le \frac{p-1}{2}.$$
Write $p=2n+k$ with $k\ge 1$ and substitute $n=\frac{p-k}{2}$:
$$4\left(n^{2}+1\right)=(p-k)^{2}+4\equiv k^{2}+4 \pmod p .$$
As $p\mid n^{2}+1$ and $p$ is odd,
$$p\ \mid\ k^{2}+4 .$$
The number $k^{2}+4$ is positive, so $k^{2}+4\ge p=2n+k$, that is
$$k^{2}-k+4\ \ge\ 2n\quad\Longrightarrow\quad k\ >\ \sqrt{2n}\ \ \text{for large } n$$
(more precisely, $k^{2}\ge 2n+k-4$ gives $k\ge\sqrt{2n}$ for $n\ge 2$, with strict inequality for large $n$).

Hence
$$p=2n+k\ >\ 2n+\sqrt{2n},$$
so $n^{2}+1$ has a prime divisor exceeding $2n+\sqrt{2n}$. Since there are infinitely many such primes $p$, each giving its own $n$ (with $n\to\infty$ as $p\to\infty$), there are infinitely many such $n$. $\blacksquare$`,
  tags:["quadratic residues","size estimate","prime divisors"] },

"2009-1": { title:"A chain of divisibilities",
  statement: String.raw`Let $n$ be a positive integer and let $a_{1},a_{2},\dots,a_{k}$ ($k\ge2$) be distinct elements of $\{1,2,\dots,n\}$ such that
$$n\ \mid\ a_{i}\left(a_{i+1}-1\right)\qquad\text{for } i=1,2,\dots,k-1 .$$
Prove that $n\nmid a_{k}\left(a_{1}-1\right)$.`,
  hints:[ String.raw`The condition says $a_{i}a_{i+1}\equiv a_{i}\pmod n$.`,
          String.raw`Prove by induction that $a_{1}a_{i}\equiv a_{1}\pmod n$ for every $i$.`,
          String.raw`If $n\mid a_{k}(a_{1}-1)$ then $a_{k}\equiv a_{1}a_{k}\equiv a_{1}\pmod n$. Why is that impossible?`],
  solution: String.raw`The hypothesis reads
$$a_{i}a_{i+1}\equiv a_{i}\pmod n,\qquad i=1,\dots,k-1. \tag{1}$$

*Lemma.* $a_{1}a_{i}\equiv a_{1}\pmod n$ for every $i=1,\dots,k$.

Induction on $i$. The base $i=2$ is exactly (1) with $i=1$. Assume $a_{1}a_{i}\equiv a_{1}$ for some $i\le k-1$. Multiplying (1) by $a_{1}$,
$$a_{1}a_{i}a_{i+1}\equiv a_{1}a_{i}\equiv a_{1}\pmod n .$$
On the other hand, multiplying the induction hypothesis by $a_{i+1}$ gives $a_{1}a_{i}a_{i+1}\equiv a_{1}a_{i+1}$. Comparing, $a_{1}a_{i+1}\equiv a_{1}\pmod n$, completing the induction.

*Conclusion.* In particular $a_{1}a_{k}\equiv a_{1}\pmod n$. Suppose $n\mid a_{k}\left(a_{1}-1\right)$, i.e. $a_{1}a_{k}\equiv a_{k}\pmod n$. Then
$$a_{k}\equiv a_{1}a_{k}\equiv a_{1}\pmod n .$$
But $a_{1},a_{k}\in\{1,\dots,n\}$ are distinct, so $a_{1}\not\equiv a_{k}\pmod n$ — a contradiction.

Hence $n\nmid a_{k}\left(a_{1}-1\right)$. $\blacksquare$`,
  tags:["congruences","induction","contradiction"] },

"2009-2": { title:"Tangency and equal distances to the centre",
  statement: String.raw`Let $ABC$ be a triangle with circumcentre $O$. The points $P$ and $Q$ are interior points of the sides $CA$ and $AB$ respectively. Let $K$, $L$, $M$ be the midpoints of the segments $BP$, $CQ$, $PQ$, and let $\Gamma$ be the circle through $K$, $L$, $M$. Suppose that the line $PQ$ is tangent to $\Gamma$. Prove that $OP=OQ$.`,
  hints:[ String.raw`Express $OP$ and $OQ$ via the power of a point: $OP^{2}=R^{2}-PA\cdot PC$ and $OQ^{2}=R^{2}-QA\cdot QB$. So it suffices to prove $PA\cdot PC=QA\cdot QB$.`,
          String.raw`$MK$ is a midline of triangle $PQB$: $MK\parallel QB$ and $MK=\frac{QB}{2}$. Similarly $ML\parallel PC$, $ML=\frac{PC}{2}$.`,
          String.raw`Tangency at $M$ gives tangent–chord angles: the angles of triangle $KML$ are expressed through $\angle AQP$ and $\angle APQ$. Apply the sine rule twice.`],
  solution: String.raw`*Step 1: what has to be proved.* The point $P$ lies inside the circumcircle on the chord $CA$, so the power of $P$ equals $OP^{2}-R^{2}=-PA\cdot PC$. Similarly $OQ^{2}-R^{2}=-QA\cdot QB$. Hence
$$OP=OQ\iff PA\cdot PC=QA\cdot QB. \tag{1}$$

*Step 2: midlines.* As $M$ is the midpoint of $PQ$ and $K$ of $PB$, the segment $MK$ is a midline of triangle $PQB$:
$$MK\parallel QB,\qquad MK=\frac{QB}{2}.$$
Similarly $ML$ is a midline of triangle $QPC$:
$$ML\parallel PC,\qquad ML=\frac{PC}{2}.$$

*Step 3: the tangent–chord angle.* The line $PQ$ touches $\Gamma$ at $M$, so by the tangent–chord angle theorem
$$\angle(MQ,MK)=\angle MLK,\qquad \angle(MP,ML)=\angle MKL .$$
Since $MK\parallel QB$, we have $\angle(MQ,MK)=\angle PQB$; similarly $\angle(MP,ML)=\angle QPC$. Hence
$$\angle MLK=\angle PQB,\qquad \angle MKL=\angle QPC .$$

*Step 4: two applications of the sine rule.* In triangle $KML$,
$$\frac{MK}{\sin\angle MLK}=\frac{ML}{\sin\angle MKL}\ \Longrightarrow\ \frac{QB}{\sin\angle PQB}=\frac{PC}{\sin\angle QPC}.$$
Since $\angle PQB=180^{\circ}-\angle AQP$ and $\angle QPC=180^{\circ}-\angle APQ$, the sines agree:
$$\frac{QB}{\sin\angle AQP}=\frac{PC}{\sin\angle APQ}. \tag{2}$$
In triangle $AQP$ the sine rule gives
$$\frac{AP}{\sin\angle AQP}=\frac{AQ}{\sin\angle APQ}\ \Longrightarrow\ \frac{\sin\angle AQP}{\sin\angle APQ}=\frac{AP}{AQ}. \tag{3}$$
From (2), $\frac{QB}{PC}=\frac{\sin\angle AQP}{\sin\angle APQ}$, and with (3)
$$\frac{QB}{PC}=\frac{AP}{AQ}\iff AQ\cdot QB=AP\cdot PC .$$
By (1), $OP=OQ$. $\blacksquare$`,
  tags:["power of a point","midline","tangent–chord angle","sine rule"] },

"2009-3": { title:"Two subsequences are arithmetic",
  statement: String.raw`Suppose that $s_{1}<s_{2}<s_{3}<\cdots$ is a strictly increasing sequence of positive integers such that both subsequences
$$s_{s_{1}},\,s_{s_{2}},\,s_{s_{3}},\dots\qquad\text{and}\qquad s_{s_{1}+1},\,s_{s_{2}+1},\,s_{s_{3}+1},\dots$$
are arithmetic progressions. Prove that the sequence $s_{1},s_{2},s_{3},\dots$ is itself an arithmetic progression.`,
  hints:[ String.raw`Write $d_{n}=s_{n+1}-s_{n}\ge1$ and let $D$, $D'$ be the common differences of the two progressions. Express $D$ as a sum of consecutive $d_j$.`,
          String.raw`From $D=\sum_{j=s_{n}}^{s_{n+1}-1}d_{j}$ (exactly $d_{n}$ terms, each $\ge1$) deduce $d_{n}\le D$: the increments are bounded, so $m=\min d_{n}$ and $M=\max d_{n}$ exist.`,
          String.raw`Show that $d_{s_{n}}$ does not depend on $n$, then compare this constant with $m$ and with $M$ using the cases $d_{n}=M$ and $d_{n}=m$.`],
  solution: String.raw`Write $d_{n}=s_{n+1}-s_{n}\ge 1$, and let $D$ and $D'$ be the common differences of $\left(s_{s_{n}}\right)$ and $\left(s_{s_{n}+1}\right)$.

*Step 1: the increments are bounded.* For every $n$,
$$D=s_{s_{n+1}}-s_{s_{n}}=\sum_{j=s_{n}}^{s_{n+1}-1}d_{j},$$
a sum of exactly $s_{n+1}-s_{n}=d_{n}$ terms, each at least $1$. Hence $d_{n}\le D$ for all $n$, so
$$m=\min_{n}d_{n}\ge1,\qquad M=\max_{n}d_{n}\le D$$
exist, and from the same formula
$$m\,d_{n}\ \le\ D\ \le\ M\,d_{n}\qquad\text{for all } n. \tag{1}$$
Putting $d_{n}=M$ and $d_{n}=m$ into (1) gives $mM\le D\le Mm$, that is
$$D=mM. \tag{2}$$

*Step 2: $d_{s_{n}}$ is constant.* We have $s_{s_{n}+1}-s_{s_{n}}=d_{s_{n}}$. Subtracting $s_{s_{n+1}}-s_{s_{n}}=D$ from $s_{s_{n+1}+1}-s_{s_{n}+1}=D'$ yields
$$d_{s_{n+1}}-d_{s_{n}}=D'-D\qquad\text{for all } n .$$
If $D'\ne D$, the sequence $d_{s_{n}}$ would change by a fixed non-zero amount and become unbounded, contradicting $d_{n}\le D$. So $D'=D$ and
$$d_{s_{n}}=c\qquad\text{is a constant independent of } n. \tag{3}$$

*Step 3: $m=M$.* Take $n$ with $d_{n}=M$. By (2) the left inequality in (1) is an equality, and the sum $\sum_{j=s_{n}}^{s_{n}+M-1}d_{j}=D=mM$ consists of $M$ terms each $\ge m$; hence all of them equal $m$. In particular the first one gives $d_{s_{n}}=m$, so $c=m$ by (3).

Now take $n$ with $d_{n}=m$. Then $\sum_{j=s_{n}}^{s_{n}+m-1}d_{j}=D=mM$ consists of $m$ terms each $\le M$ summing to $mM$, so all equal $M$, and the first one gives $d_{s_{n}}=M$, i.e. $c=M$.

Hence $m=c=M$: all $d_{n}$ are equal and $(s_{n})$ is an arithmetic progression. $\blacksquare$`,
  tags:["extremal principle","bounded increments","arithmetic progressions"] },

"2009-5": { title:"A function and a non-degenerate triangle",
  statement: String.raw`Determine all functions $f$ from the set of positive integers to itself such that, for all positive integers $a$ and $b$, there exists a non-degenerate triangle with side lengths
$$a,\qquad f(b),\qquad f\left(b+f(a)-1\right).$$`,
  answer: String.raw`The only solution is $f(n)=n$.`,
  hints:[ String.raw`Substitute $a=1$: a side of length $1$ in a non-degenerate triangle severely restricts the other two sides.`,
          String.raw`You obtain $\left|f(b)-f\left(b+f(1)-1\right)\right|<1$, i.e. equality. If $f(1)>1$, the function is periodic and bounded — derive a contradiction with a large $a$.`,
          String.raw`Once $f(1)=1$, substitute $b=1$ to get $f(f(a))=a$. Then substitute $a=2$ and use bijectivity.`],
  solution: String.raw`*Step 1: $f(1)=1$.* Put $a=1$. The triangle with sides $1,\ f(b),\ f(b+f(1)-1)$ is non-degenerate, so
$$\left|f(b)-f\left(b+f(1)-1\right)\right|<1\ \Longrightarrow\ f(b)=f\left(b+f(1)-1\right)\quad\text{for all } b .$$
If $f(1)-1=k>0$ then $f$ is periodic with period $k$, hence bounded, say $f\le C$. But then for $a>2C$ the triangle inequality $a<f(b)+f(b+f(a)-1)\le 2C$ fails. So $k=0$, i.e. $f(1)=1$.

*Step 2: $f$ is an involution.* Put $b=1$. The sides are $a,\ f(1)=1,\ f(f(a))$, and non-degeneracy gives
$$\left|a-f(f(a))\right|<1\ \Longrightarrow\ f(f(a))=a\quad\text{for all } a .$$
In particular $f$ is a bijection.

*Step 3: the step of $f$ is $\pm1$.* Put $a=2$ and $k=f(2)-1$. The triangle with sides $2,\ f(b),\ f(b+k)$ is non-degenerate, so
$$\left|f(b)-f(b+k)\right|<2\ \Longrightarrow\ \left|f(b)-f(b+k)\right|\le 1\quad\text{for all } b. \tag{2}$$
If $k=0$ then $f(2)=1=f(1)$, contradicting injectivity, so $k\ge 1$. Injectivity also forbids equality to zero in (2), hence
$$f(b+k)=f(b)\pm 1\qquad\text{for all } b. \tag{3}$$

*Step 4: along each residue class $f$ increases.* Fix a residue and look at $f(q),\,f(q+k),\,f(q+2k),\dots$ By (3) this is a $\pm1$ walk, and by injectivity all its values are distinct. But a $\pm1$ walk with no repeated value is strictly monotone (after a turn a value would repeat). It cannot decrease forever since the values are positive integers, so
$$f(q+k)=f(q)+1\qquad\text{for all } q,\qquad\text{hence}\qquad f(q+nk)=f(q)+n. \tag{4}$$

*Step 5: $k=1$.* Apply $f$ to (4), using $f(f(x))=x$:
$$f\bigl(f(q)+n\bigr)=f\bigl(f(q+nk)\bigr)=q+nk .$$
As $q$ runs over $\mathbb{N}$, the value $m=f(q)$ runs over all of $\mathbb{N}$ (bijectivity) and $q=f(m)$, so
$$f(m+n)=f(m)+nk\qquad\text{for all } m,n\in\mathbb{N}.$$
With $n=1$ this gives $f(m+1)=f(m)+k$, hence $f(q+k)=f(q)+k^{2}$. Comparing with (4), $k^{2}=1$, so $k=1$.

*Step 6: the answer.* From $k=1$ and (4), $f(q+1)=f(q)+1$, and with $f(1)=1$ this gives $f(n)=n$.

Check: the sides $a,\ b,\ b+a-1$ form a non-degenerate triangle, since $a+b>b+a-1$ and $b+(b+a-1)>a$ for $b\ge1$. $\blacksquare$`,
  tags:["functional equations","triangle inequality","bijectivity"] },

"2010-1": { title:"A functional equation with floors",
  statement: String.raw`Determine all functions $f:\mathbb{R}\to\mathbb{R}$ such that
$$f\left(\lfloor x\rfloor y\right)=f(x)\left\lfloor f(y)\right\rfloor$$
for all $x,y\in\mathbb{R}$.`,
  answer: String.raw`$f\equiv 0$, or $f\equiv c$ for any constant $c$ with $1\le c<2$.`,
  hints:[ String.raw`Substitute $x=0$: you get $f(0)=f(0)\lfloor f(y)\rfloor$ for all $y$.`,
          String.raw`If $f(0)\ne 0$, then $\lfloor f(y)\rfloor=1$ for all $y$; now substitute $x=1$.`,
          String.raw`If $f(0)=0$, substitute $x\in[0,1)$ and then the pair $x=2,\ y=\frac12$ to force $f\equiv 0$.`],
  solution: String.raw`*Case 1: $f(0)\ne 0$.* Substituting $x=0$ gives $f(0)=f(0)\lfloor f(y)\rfloor$, so $\lfloor f(y)\rfloor=1$ for all $y$. The equation becomes
$$f\left(\lfloor x\rfloor y\right)=f(x)\quad\text{for all } x,y .$$
Taking $x=1$ gives $f(y)=f(1)$ for all $y$, i.e. $f\equiv c$ is constant, and $\lfloor c\rfloor=1$ means $1\le c<2$. Check: $f(\lfloor x\rfloor y)=c$ and $f(x)\lfloor f(y)\rfloor=c\cdot1=c$ — valid.

*Case 2: $f(0)=0$.* For $x\in[0,1)$ we have $\lfloor x\rfloor=0$, so
$$0=f(0)=f(x)\left\lfloor f(y)\right\rfloor\qquad\text{for all } x\in[0,1),\ y\in\mathbb{R}. \tag{1}$$

Substituting $x=1$ into the original equation: $f(y)=f(1)\lfloor f(y)\rfloor$ for all $y$. In particular at $y=1$: $f(1)=f(1)\lfloor f(1)\rfloor$, so $f(1)=0$ or $\lfloor f(1)\rfloor=1$.

If $f(1)=0$ then $f(y)=f(1)\lfloor f(y)\rfloor=0$ for all $y$, i.e. $f\equiv 0$ — valid (both sides vanish).

Suppose $\lfloor f(1)\rfloor=1$. Substitute $x=2$, $y=\frac12$:
$$f(1)=f\left(\lfloor 2\rfloor\cdot\tfrac12\right)=f(2)\left\lfloor f\left(\tfrac12\right)\right\rfloor .$$
By (1) with $x=\frac12$ and any $y$ for which $\lfloor f(y)\rfloor\ne 0$, we get $f\left(\frac12\right)=0$; and if $\lfloor f(y)\rfloor=0$ for every $y$, the original equation forces $f\equiv 0$, contradicting $\lfloor f(1)\rfloor=1$. So $f\left(\frac12\right)=0$, hence $\left\lfloor f\left(\frac12\right)\right\rfloor=0$ and $f(1)=0$ — contradicting $\lfloor f(1)\rfloor=1$.

So the answers are $f\equiv 0$ and $f\equiv c$ with $1\le c<2$.`,
  tags:["functional equations","floor function","case analysis"] },

"2010-4": { title:"A tangent and two equal chords",
  statement: String.raw`Let $P$ be a point inside the triangle $ABC$. The lines $AP$, $BP$, $CP$ meet the circumcircle $\Gamma$ of $ABC$ again at $K$, $L$, $M$ respectively. The tangent to $\Gamma$ at $C$ meets the line $AB$ at $S$. Suppose that $SC=SP$. Prove that $MK=ML$.`,
  hints:[ String.raw`The tangent gives $SC^{2}=SA\cdot SB$ (power of $S$). What does the condition $SP=SC$ then mean?`,
          String.raw`From $SP^{2}=SA\cdot SB$ it follows that $SP$ is tangent to the circumcircle of triangle $APB$ at $P$.`,
          String.raw`Translate that into the angle equality $\angle SPA=\angle ABP$, and then into an equality of arcs $MK$ and $ML$ of $\Gamma$.`],
  solution: String.raw`*Step 1: a tangent to $(APB)$.* Since $SC$ is tangent to $\Gamma$ at $C$, the power of $S$ with respect to $\Gamma$ equals $SC^{2}=SA\cdot SB$. By hypothesis $SP=SC$, so
$$SP^{2}=SA\cdot SB .$$
But $SA\cdot SB$ is the power of $S$ with respect to the circumcircle $\omega$ of triangle $APB$ (the line $SAB$ is a secant of $\omega$). So $SP^{2}$ equals the power of $S$ with respect to $\omega$, which means the line $SP$ is tangent to $\omega$ at $P$.

*Step 2: angles.* Tangency at $P$ and the tangent–chord angle theorem give
$$\angle(SP,PA)=\angle ABP,\qquad \angle(SP,PB)=\angle BAP .$$

*Step 3: from angles to arcs.* The rest is an angle chase turning these equalities into equal inscribed angles subtending the chords $MK$ and $ML$ of $\Gamma$: one uses $K=AP\cap\Gamma$, $L=BP\cap\Gamma$, $M=CP\cap\Gamma$ and the fact that triangle $SPC$ is isosceles ($SP=SC$), so $\angle SPC=\angle SCP$, while $\angle SCP$ is the angle between the tangent $SC$ and the chord $CM$, hence equal to the inscribed angle on $CM$. Combining with Step 2 one obtains $\angle MKL=\angle MLK$, so triangle $KML$ is isosceles and
$$MK=ML. \qquad\blacksquare$$

*Remark.* The skeleton above contains the substance: Steps 1–2 (power of a point and the tangency to $(APB)$) are the whole idea; the closing angle chase in Step 3 is worth carrying out yourself, watching directed angles carefully.`,
  tags:["power of a point","tangency of circles","angle chasing"] }

});
