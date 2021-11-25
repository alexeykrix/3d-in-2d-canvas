class Vec2 {
  constructor(x, y) {
    this.x = x
    this.y = y ?? x
  }

  plus(other) {
    if (typeof other === 'object') {
      this.x = this.x + other.x
      this.y = this.y + other.y
    } else if (typeof other === 'number') {
      this.x += other
      this.y += other
    }
  }
  minus(other) {
    if (typeof other === 'object') {
      this.x = this.x - other.x
      this.y = this.y - other.y
    } else if (typeof other === 'number') {
      this.x -= other
      this.y -= other
    }
  }
  myltiply(other) {
    if (typeof other === 'object') {
      this.x = this.x * other.x
      this.y = this.y * other.y
    } else if (typeof other === 'number') {
      this.x *= other
      this.y *= other
    }
  }
  divide(other) {
    if (typeof other === 'object') {
      this.x = this.x / other.x
      this.y = this.y / other.y
    } else if (typeof other === 'number') {
      this.x /= other
      this.y /= other
    }
  }
  val() {
    return {x: this.x, y: this.y}
  }
}

class Vec3 {
  constructor(x, y, z) {
    this.x = x
    this.y = y ?? x
    this.z = z ?? this.y
    if (typeof x === 'object') {
      this.x = x.x
      this.y = x.y
      this.z = x.z
    } else if (typeof y === 'object') {
      this.y = y.x
      this.z = y.y
    }
  }

  plus(other) {
    if (typeof other === 'object') {
      this.x = this.x + other.x
      this.y = this.y + other.y
      this.z = this.z + other.z
    } else if (typeof other === 'number') {
      this.x += other
      this.y += other
      this.z += other
    }
  }
  minus(other) {
    if (typeof other === 'object') {
      this.x = this.x - other.x
      this.y = this.y - other.y
      this.z = this.z - other.z
    } else if (typeof other === 'number') {
      this.x -= other
      this.y -= other
      this.z -= other
    }
  }
  myltiply(other) {
    if (typeof other === 'object') {
      this.x = this.x * other.x
      this.y = this.y * other.y
      this.z = this.z * other.z
    } else if (typeof other === 'number') {
      this.x *= other
      this.y *= other
      this.z *= other
    }
  }
  divide(other) {
    if (typeof other === 'object') {
      this.x = this.x / other.x
      this.y = this.y / other.y
      this.z = this.z / other.z
    } else if (typeof other === 'number') {
      this.x /= other
      this.y /= other
      this.z /= other
    }
  }
  invert() {
    this.x = -this.x
    this.y = -this.y
    this.z = -this.z
  }
  val() {
    return {x: this.x, y: this.y, z: this.z}
  }
}



class App {
  constructor(container, w, h) {
    this.container = container
    this.w = w
    this.h = h
    this.ppi = 1
  }

  createScene(w, h) {
    this.scene = document.createElement('canvas')
    this.scene.classList.add('canvas')
    if (w) {
      this.changeSceneSize(w, h)
    }
  }
  changeSceneSize(w, h = w) {
    this.scene.width = w
    this.scene.height = h
  }

  addScene() {
    this.createScene(this.w, this.h)
    this.container.appendChild(this.scene)
    this.t = 0
    window.requestAnimationFrame(() => {
      this.render(this.sphere(this.t))
      this.t++
    }) 
  }

  clamp(val, min, max) {
    return Math.max(Math.min(val, max), min)
  }
  abs(obj) { return {
    x: Math.abs(obj.x),
    y: Math.abs(obj.y),
    z: Math.abs(obj.z),
  }}

  length2(v) { return Math.sqrt(v.x*v.x+v.y*v.y) }
  length3(v) { return Math.sqrt(v.x*v.x+v.y*v.y+v.z*v.z) }
  norm3(v) { return { 
    x: v.x/this.length3(v),
    y: v.y/this.length3(v),
    z: v.z/this.length3(v)
  }}
  dot(a,b) { return a.x * b.x + a.y * b.y + a.z * b.z}
  sph(ro, rd, r) {
    let b = this.dot(ro, rd)
    let c = this.dot(ro,ro) - r * r
    let h = b * b - c
    if (h < 0) return new Vec2(-1).val()
    h = Math.sqrt(h)
    return new Vec2(-b - h, -b + h).val()
  }
  
  sphere(t = 0) {
    let screen = []
    let ppi = 0.2
    let w = this.w * ppi
    let h = this.h * ppi
    let gradient = [
      'rgba(255,255,255,0.0)', 
      'rgba(255,255,255,0.01)', 
      'rgba(255,255,255,0.02)', 
      'rgba(255,255,255,0.03)', 
      'rgba(255,255,255,0.04)', 
      'rgba(255,255,255,0.05)', 
      'rgba(255,255,255,0.1)', 
      'rgba(255,255,255,0.15)', 
      'rgba(255,255,255,0.2)',
      'rgba(255,255,255,0.25)',
      'rgba(255,255,255,0.3)',
      'rgba(255,255,255,0.35)',
      'rgba(255,255,255,0.4)',
      'rgba(255,255,255,0.45)',
      'rgba(255,255,255,0.5)',
      'rgba(255,255,255,0.55)',
      'rgba(255,255,255,0.6)',
      'rgba(255,255,255,0.65)',
      'rgba(255,255,255,0.7)',
      'rgba(255,255,255,0.75)',
      'rgba(255,255,255,0.8)',
      'rgba(255,255,255,0.85)',
      'rgba(255,255,255,0.9)',
      'rgba(255,255,255,0.95)',
      'rgba(255,255,255,1)',
    ]

    let light = this.norm3(new Vec3(Math.sin(t * 0.01), Math.cos(t*0.01), -1.0))

    for (let i = 0; i < w; i++) {
      for (let j = 0; j < h; j++) {
        let uv = new Vec2(i, j)
          uv.divide(new Vec2(w, h).val())
          uv.myltiply(2)
          uv.minus(1)
        uv = uv.val()

        let color = ''
        let ro = new Vec3(-2, 0, 0).val()
        let rd = this.norm3(new Vec3(1, uv).val())
        
        let colorId = 0
        let intersection = this.sph(ro, rd, 1)
        if (intersection.x > 0) {
          let rdIntersect = new Vec3(rd)
            rdIntersect.myltiply(intersection.x)
          
          let itPoint = new Vec3(ro)
            itPoint.plus(rdIntersect.val())
        
          let n = this.norm3(itPoint.val())
          let diff = this.dot(n, light)
          colorId = Math.floor(diff * 20)
          if (colorId < 1) colorId = 1

          color = gradient[colorId-1]
          screen.push({ 
            color, x: i, y: j 
          })
        } 
        color = gradient[colorId-1]
      }
    }

    return screen
  }

  render(arr) {
    let c = this.scene.getContext('2d')
    let ppi = 6
    
    c.clearRect(0,0, this.w, this.h)
    arr.forEach(({color, x, y}) => {
      c.fillStyle = color
      c.fillRect(x*ppi, y*ppi, ppi, ppi)
    })

    window.requestAnimationFrame(() => {
      this.render(this.sphere(this.t))
      this.t++
    }) 
  }
  
}

const container = document.querySelector('.app')
const app = new App(container, 600, 600)
app.addScene()
app.sphere()