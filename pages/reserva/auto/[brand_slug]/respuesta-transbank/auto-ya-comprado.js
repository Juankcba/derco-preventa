import BasicLayout from "../../../../layout/BasicLayout";
import NumberFormat from "react-number-format";
import { useRouter } from 'next/router'
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const AutoYaComprado = () => {
  const [loadingChanguePage, setLoadingChanguePage] = useState(false)
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

  const handleGoToSelectCar = () => {
    setLoadingChanguePage(true)
    router.push({
      pathname: '/preventa/[slug]',
      query: { slug: preorderModelSlug, rut: order.customer.rut }
    })
  }

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
                    <p className="font-montserratBold text-2xl">
                      { order.customer.first_name } { order.customer.last_name }
                    </p>
                    <p className="text-2xl tracking-wide">
                      Demoraste mucho....
                    </p>
                    <p className="text-2xl tracking-wide mb-4">
                      Tu reserva no se ha realizado, por favor, selecciona el auto nuevamente.
                    </p>
                    <p className="text-lg uppercase text-center mb-4">
                      valor de reserva
                    </p>
                    <p className="text-4xl font-montserratBold text-center">
                      <NumberFormat
                        value={preorderData.price}
                        displayType={"text"}
                        thousandSeparator={"."}
                        decimalSeparator={","}
                        prefix={"$"}
                      />                      
                    </p>
                    <button className="h-14 max-w-[300px] flex items-center justify-center
                    px-5 border-2 border-red-600 rounded-md text-white font-medium
                    bg-gradient-red text-xl w-full mt-4
                    hover:text-white hover:bg-gradient-red-hover transition mx-auto"
                    disabled={loadingChanguePage ? true : false}
                    onClick={handleGoToSelectCar}>
                      Ir a selección
                      {loadingChanguePage && (
                        <svg
                          className="animate-spin h-5 w-5 ml-2 mt-1"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.2"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                            fill="white"
                          />
                          <path
                            d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
                            fill="white"
                          />
                        </svg>
                      )}
                    </button>
                    <img src="https://s3.amazonaws.com/dercocenter.cl/preventa/assets/transbank.png"
                    alt="transbank preventa" className="mt-3"/>
                    <img src={order.car.image_url} alt={order.car.version_slug}
                    className="block sm:hidden mt-6" />
                    <div className="">
                      <p>
                        <span>Nombre: </span>
                        <span className="font-montserratBold">
                          { order.customer.first_name } { order.customer.last_name }
                        </span>
                      </p>
                      <p>
                        <span>Rut: </span>
                        <span className="font-montserratBold">{ order.customer.rut }</span>
                      </p>
                      <p>
                        <span>Celular: </span>
                        <span className="font-montserratBold">{ order.customer.phone }</span>
                      </p>
                      <p>
                        <span>Email: </span>
                        <span className="font-montserratBold">{ order.customer.email }</span>
                      </p>
                      <p>
                        <span>Concesionario seleccionado: </span><br />
                        <span className="font-montserratBold">{ order.subsidiary.name }</span>
                      </p>
                      <hr className="my-5" />
                      <p className="text-sm mb-3">
                        {`${order.car.version_name} · Color ${order.car.color.name}`}
                      </p>
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

export default AutoYaComprado;
