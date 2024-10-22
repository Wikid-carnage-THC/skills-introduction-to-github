// Unless explicitly stated otherwise all files in this repository are licensed under the Apache 2.0 License.
//
// This product includes software developed at Datadog (https://www.datadoghq.com/). Copyright 2021 Datadog, Inc.

import Hook from '../../index.js'
import a from '../fixtures/export-types/default-expression-array.mjs'
import n from '../fixtures/export-types/default-expression-num.mjs'
import s from '../fixtures/export-types/default-expression-string.mjs'
import fn from '../fixtures/export-types/default-function.mjs'
import cn from '../fixtures/export-types/default-class.mjs'
import gfn from '../fixtures/export-types/default-generator.mjs'
import afn from '../fixtures/export-types/default-function-anon.mjs'
import acn from '../fixtures/export-types/default-class-anon.mjs'
import agfn from '../fixtures/export-types/default-generator-anon.mjs'
import { strictEqual } from 'assert'

Hook((exports, name) => {
  if (name.match(/default-expression-array\.m?js/)) {
    exports.default[0] += 1
  } else if (name.match(/default-expression-num\.m?js/)) {
    exports.default += 1
  }
  else if (name.match(/default-expression-string\.m?js/)) {
    exports.default += 'dawg'
  }
  else if (name.match(/default-function\.m?js/)) {
    const orig = exports.default
    exports.default = function () {
      return orig() + 1
    }
  }
  else if (name.match(/default-class\.m?js/)) {
    exports.default.prototype.getFoo = function () {
      return 2
    }
  }
  else if (name.match(/default-generator\.m?js/)) {
    const orig2 = exports.default
    exports.default = function* () {
      return orig2().next().value + 1
    }
  }
  else if (name.match(/default-function-anon\.m?js/)) {
    const orig = exports.default
    exports.default = function () {
      return orig() + 1
    }
  }
  else if (name.match(/default-class-anon\.m?js/)) {
    exports.default.prototype.getFoo = function () {
      return 2
    }
  }
  else if (name.match(/default-generator-anon\.m?js/)) {
    const orig2 = exports.default
    exports.default = function* () {
      return orig2().next().value + 1
    }
  }
})

strictEqual(a[0], 2)
strictEqual(fn(), 2)
strictEqual(new cn().getFoo(), 2)
strictEqual(gfn().next().value, 2)
strictEqual(afn(), 2)
strictEqual(new acn().getFoo(), 2)
strictEqual(agfn().next().value, 2)
// the below tests won't work because literal default exports are static
// strictEqual(n, 2)
// strictEqual(s, 'dogdawg')
