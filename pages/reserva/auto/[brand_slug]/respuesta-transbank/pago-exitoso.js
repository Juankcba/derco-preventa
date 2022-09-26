import BasicLayout from "../../../../layout/BasicLayout";
import NumberFormat from "react-number-format";
import { useRouter } from 'next/router'
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Link from 'next/link'

const PagoExitoso = () => {
  const order = useSelector((state) => state.preorder.order)
  const router = useRouter()
  const preorderData = useSelector((state) => state.preorder.data)
  const preorderModelSlug = preorderData?.slug

  useEffect(() => {
    if (!preorderModelSlug) {
      return
    }
    if (Object.keys(order).length === 0) {
      const transbackResponse = localStorage.getItem('response-code-t')
      if (transbackResponse) {
        router.push({
          pathname: '/preventa/[slug]/respuesta-transbank/[token]/',
          query: { slug: preorderModelSlug, token: transbackResponse  }
        })
      } else {
        router.push({
          pathname: '/preventa/[slug]',
          query: { slug: preorderModelSlug  }
        })
      }
    }
  }, [order, router, preorderModelSlug])

  if (Object.keys(order).length === 0 || !preorderModelSlug) {
    return (
      <BasicLayout preventa={{ status: true, step: 3 }}>
      <div className="flex justify-center items-center py-12">
        <img
              src="https://s3.amazonaws.com/dercocenter.cl/preventa/assets/ajax-loader.gif"
              alt="loading"
            />
      </div>
    </BasicLayout>
    )
  } else {
    return (
      <BasicLayout preventa={{ status: true, step: 3 }}>
        <div className="relative bg-gray-100">
          <div className="absolute top-0 w-full">
            <picture>
              <source media="(min-width: 640px)" srcSet={ preorderData.content.backgroundCarLess } />
              <img src={ preorderData.content.backgroundCarLessMobile } className={'w-full max-h-[714px] object-cover'} />
            </picture>
          </div>
          <div className="h-7 w-full bg-transparent"></div>
          <div className="max-w-screen-2xl mx-auto px-5 relative min-h-[80vh]">
            <div className="flex justify-center gap-7 lg:gap-16">
              <div className="w-full hidden sm:block">
                <img src={order.car.image_url} alt={order.car.version_slug}
                className="mt-28" />
                <img src={ preorderData.content.backgroundCarLess }
                className="invisible w-full sm:w-1/4 md:w-5/12 lg:w-6/12 xl:w-8/12 2xl:w-full
                transition-all duration-500" />
                <div className="p-5 max-w-[400px] 2xl:bg-gray-100 rounded-md">
                    <p className="text-lg">
                      { `${preorderData.name}
                      ${order.car.version_name} · Color
                      ${order.car.color.name}` }
                    </p>
                    <div className="flex mt-4 justify-between">
                      <a target="_blank" href={`/auto/${preorderModelSlug}`}
                      className="text-red-600 text-lg text-center underline
                      hover:font-medium hover:underline hover:text-red-600 transition">
                        Ver Ficha del Modelo
                      </a>
                      <a target="_blank" href={ preorderData.content.catalog }
                      className="text-red-600 text-lg text-center underline
                      hover:font-medium hover:underline hover:text-red-600 transition">
                        Descargar ficha técnica
                      </a>
                    </div>
                  </div>
              </div>
              <div className="w-full">
                <div className="max-w-lg mx-auto">
                  <div className="w-full rounded-lg bg-white p-5">
                    <img src={order.car.image_url} alt={order.car.version_slug}
                    className="block sm:hidden" />
                    <h1 className="font-bold text-xl">
                      ¡Felicitaciones! <br /><br />
                      { order.customer.first_name } { order.customer.last_name }
                    </h1>
                    <div className="flex items-center gap-3 mt-12">
                      <img src="https://s3.amazonaws.com/dercocenter.cl/preventa/assets/OK.svg"
                      className="w-8"/>
                      <p className="text-lg text-[#77bf29]">Tu código de reserva: { order.purchase_order }</p>
                    </div>
                    <p className="text-lg mt-9">Pronto te enviaremos los detalles a tu correo</p>
                    <div className="border border-red-600 p-5 rounded-md mt-5">
                      <p>
                        <span className="font-light">Nombre: </span>
                        <span>
                          { order.customer.first_name } { order.customer.last_name }
                        </span>
                      </p>
                      <p>
                        <span className="font-light">Rut: </span>
                        <span>{ order.customer.rut }</span>
                      </p>
                      <p>
                        <span className="font-light">Celular: </span>
                        <span>{ order.customer.phone }</span>
                      </p>
                      <p>
                        <span className="font-light">Email: </span>
                        <span>{ order.customer.email }</span>
                      </p>
                      <p>
                        <span className="font-light">Concesionario seleccionado: </span><br />
                        <span>{ order.subsidiary.name }</span>
                      </p>
                      <hr className="my-5" />
                      <p>
                        <span  className="font-light">Precio desde: </span>
                        <span>
                          <NumberFormat
                            value={order.car.financial_price}
                            displayType={"text"}
                            thousandSeparator={"."}
                            decimalSeparator={","}
                            prefix={"$"}
                          />
                        </span>
                      </p>
                      <p  className="font-light">Incluye: </p>
                      <p>
                        <span  className="font-light">Bono Marca: </span>
                        <span>
                          <NumberFormat
                            value={order.car.brand_discount}
                            displayType={"text"}
                            thousandSeparator={"."}
                            decimalSeparator={","}
                            prefix={"$"}
                          />
                        </span>
                      </p>
                      <p>
                        <span  className="font-light">Bono Financiamiento:</span>
                        <span>
                          <NumberFormat
                            value={order.car.financial_discount}
                            displayType={"text"}
                            thousandSeparator={"."}
                            decimalSeparator={","}
                            prefix={"$"}
                          />
                        </span>
                      </p>
                      <p  className="font-light">Todos los precios incluyen IVA</p>
                    </div>
                    <p className="text-2xl font-montserratBold mt-8">¿Tienes dudas?</p>
                    <p className="text-lg mt-4">
                      No te preocupes, llámanos o escríbenos y te ayudamos.
                    </p>
                    <div className="flex justify-center mt-4 mb-4">
                      <a href="tel:600600800" className="h-14 max-w-[256px] flex items-center
                      px-5 border-2 border-red-600 rounded-md text-red-500 font-medium
                      text-lg hover:text-white hover:bg-red-600 transition">
                        Llámanos al 600 600 800
                      </a>
                    </div>
                  </div>
                  <div className="p-5 sm:hidden">
                    <p className="text-center text-lg">
                      { `${preorderData.name}
                      ${order.car.version_name} · Color
                      ${order.car.color.name}` }
                    </p>
                    <div className="flex justify-between mt-4 gap-2">
                      <a target="_blank" href={`/auto/${preorderModelSlug}`}
                      className="text-red-600 text-lg text-center underline
                      hover:font-medium hover:underline hover:text-red-600 transition">
                        Ver Ficha del Modelo
                      </a>
                      <a target="_blank" href={ preorderData.content.catalog }
                      className="text-red-600 text-lg text-center underline
                      hover:font-medium hover:underline hover:text-red-600 transition">
                        Descargar ficha técnica
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </BasicLayout>
    )
  }
};

export default PagoExitoso;
