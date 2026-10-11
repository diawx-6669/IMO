/* Диагностика. Часть 1 — узнавание приёма: по условию выбрать инструмент, который открывает задачу.
   correct обязан входить в techniques[].problems для этой задачи, а варианты options — нет;
   это проверяет tools/validate.cjs. */
window.IMO_DIAGNOSTIC = {
  perTopic: 4,
  recognition: [

  /* ---- теория чисел ---- */
  { problem:"1988-6", correct:"vieta-jump", options:["lte","residues-mod8","divisor-structure"],
    why:{ru:"Уравнение симметрично и квадратично по каждой переменной, а параметр можно зафиксировать — сигнатура спуска по Виету.",
          en:"The equation is symmetric and quadratic in each variable, and the parameter can be fixed — the signature of Vieta jumping."} },
  { problem:"2002-4", correct:"divisor-structure", options:["lte","vieta-jump","fermat"],
    why:{ru:"В условии перечислены все делители подряд — значит, работает симметрия $d\\cdot(n/d)=n$.",
          en:"The statement lists all divisors in order, so the symmetry $d\\cdot(n/d)=n$ is what to use."} },
  { problem:"2019-4", correct:"valuation", options:["order","residues-mod8","divisor-structure"],
    why:{ru:"Слева факториал, справа — произведение со степенями двойки: сравнивать нужно показатели простого, то есть $v_2$ и формулу Лежандра.",
          en:"A factorial on one side and powers of two on the other: what you compare are prime exponents, i.e. $v_2$ and Legendre's formula."} },
  { problem:"2005-4", correct:"fermat", options:["lte","vieta-jump","divisor-structure"],
    why:{ru:"Нужно показать, что каждое простое делит какой-то член: берём показатель, зависящий от $p$, и работаем с обратными по модулю $p$.",
          en:"You must show every prime divides some term: take an exponent depending on $p$ and work with inverses modulo $p$."} },

  /* ---- алгебра ---- */
  { problem:"1995-2", correct:"cauchy", options:["telescope","polynomials","monotone"],
    why:{ru:"После подстановки остаётся сумма дробей с квадратами в числителях — это ровно форма Энгеля.",
          en:"After the substitution you are left with a sum of fractions with squares on top — exactly the Engel form."} },
  { problem:"2012-2", correct:"amgm", options:["fe-substitutions","polynomials","monotone"],
    why:{ru:"Произведение биномов при фиксированном произведении переменных: каждый множитель оценивается AM–GM с подобранными весами.",
          en:"A product of binomials with the product of the variables fixed: bound each factor by AM–GM with tuned weights."} },
  { problem:"2010-1", correct:"fe-substitutions", options:["amgm","telescope","vieta-jump"],
    why:{ru:"Функциональное уравнение решается подстановками $x=0$, $y=0$, $x=1$ — никакой непрерывности не предполагается.",
          en:"A functional equation is cracked by the substitutions $x=0$, $y=0$, $x=1$ — no continuity is assumed."} },
  { problem:"2014-1", correct:"monotone", options:["amgm","cauchy","fe-structure"],
    why:{ru:"Спрашивают про единственный индекс: вводим разность $d_n$ и смотрим, что она строго убывает.",
          en:"A unique index is asked for: introduce the difference $d_n$ and show it decreases strictly."} },

  /* ---- комбинаторика ---- */
  { problem:"1972-1", correct:"pigeonhole", options:["recurrence-count","games","layers"],
    why:{ru:"Подмножеств больше, чем возможных значений суммы, — классический Дирихле.",
          en:"There are more subsets than possible values of the sum — the classical pigeonhole."} },
  { problem:"2003-1", correct:"greedy", options:["recurrence-count","games","invariant"],
    why:{ru:"Сдвиги выбираются по одному, и на каждом шаге запрещённых значений меньше, чем всех: жадное построение.",
          en:"The translates are chosen one at a time and at each step fewer values are forbidden than available: a greedy construction."} },
  { problem:"2011-4", correct:"recurrence-count", options:["pigeonhole","graphs","invariant"],
    why:{ru:"Ответ вида $1\\cdot3\\cdot5\\cdots(2n-1)$ почти всегда означает: удалите один элемент и посчитайте способы вернуть его.",
          en:"An answer like $1\\cdot3\\cdot5\\cdots(2n-1)$ almost always means: delete one element and count the ways to put it back."} },
  { problem:"2016-2", correct:"layers", options:["pigeonhole","greedy","games"],
    why:{ru:"Ответ «$n$ кратно 9» строится склейкой блоков $9\\times9$, а оценка — работой со слоями и раскраской.",
          en:"The answer \"$n$ is a multiple of 9\" is built by gluing $9\\times9$ blocks, and the bound comes from layers and a colouring."} },

  /* ---- геометрия ---- */
  { problem:"2006-1", correct:"incenter-lemma", options:["power-of-point","coordinates","trig-geometry"],
    why:{ru:"Как только посчитан $\\angle BPC=90^{\\circ}+\\frac{\\alpha}{2}$, точка оказывается на окружности $(BIC)$, центр которой — середина дуги.",
          en:"Once $\\angle BPC=90^{\\circ}+\\frac{\\alpha}{2}$ is computed, the point lies on the circle $(BIC)$, whose centre is the arc midpoint."} },
  { problem:"2009-2", correct:"power-of-point", options:["incenter-lemma","vectors-complex","coordinates"],
    why:{ru:"Сравнить расстояния до центра описанной окружности — это сравнить степени точек: $OP^{2}=R^{2}-PA\\cdot PC$.",
          en:"Comparing distances to the circumcentre means comparing powers of points: $OP^{2}=R^{2}-PA\\cdot PC$."} },
  { problem:"2008-1", correct:"vectors-complex", options:["incenter-lemma","tangent-chord","coordinates"],
    why:{ru:"Ортоцентр и середины сторон: поместите центр описанной окружности в начало, тогда $\\vec H=\\vec A+\\vec B+\\vec C$ и всё считается.",
          en:"Orthocentre and midpoints: put the circumcentre at the origin, then $\\vec H=\\vec A+\\vec B+\\vec C$ and everything computes."} },
  { problem:"2013-4", correct:"coordinates", options:["incenter-lemma","power-of-point","tangent-chord"],
    why:{ru:"Две точки лежат на перпендикулярах к одной прямой, а доказать надо коллинеарность — координаты здесь короче синтетики.",
          en:"Two points lie on perpendiculars to the same line and collinearity is wanted — coordinates are shorter than a synthetic chase here."} }

]};
