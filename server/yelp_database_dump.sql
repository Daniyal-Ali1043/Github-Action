PGDMP         8                |            yelp %   14.12 (Ubuntu 14.12-0ubuntu0.22.04.1) %   14.12 (Ubuntu 14.12-0ubuntu0.22.04.1)     &           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            '           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            (           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            )           1262    16389    yelp    DATABASE     Y   CREATE DATABASE yelp WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE yelp;
                postgres    false            �            1259    16411    restaurants    TABLE       CREATE TABLE public.restaurants (
    id bigint NOT NULL,
    name character varying(50) NOT NULL,
    location character varying(50) NOT NULL,
    price_range integer NOT NULL,
    CONSTRAINT restaurants_price_range_check CHECK (((price_range >= 1) AND (price_range <= 5)))
);
    DROP TABLE public.restaurants;
       public         heap    postgres    false            �            1259    16410    restaurants_id_seq    SEQUENCE     {   CREATE SEQUENCE public.restaurants_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.restaurants_id_seq;
       public          postgres    false    210            *           0    0    restaurants_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.restaurants_id_seq OWNED BY public.restaurants.id;
          public          postgres    false    209            �            1259    16429    reviews    TABLE       CREATE TABLE public.reviews (
    id bigint NOT NULL,
    restaurants_id bigint NOT NULL,
    name character varying(50) NOT NULL,
    review text NOT NULL,
    rating integer NOT NULL,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);
    DROP TABLE public.reviews;
       public         heap    postgres    false            �            1259    16428    reviews_id_seq    SEQUENCE     w   CREATE SEQUENCE public.reviews_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.reviews_id_seq;
       public          postgres    false    212            +           0    0    reviews_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;
          public          postgres    false    211            �           2604    16414    restaurants id    DEFAULT     p   ALTER TABLE ONLY public.restaurants ALTER COLUMN id SET DEFAULT nextval('public.restaurants_id_seq'::regclass);
 =   ALTER TABLE public.restaurants ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210            �           2604    16432 
   reviews id    DEFAULT     h   ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);
 9   ALTER TABLE public.reviews ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    212    212            !          0    16411    restaurants 
   TABLE DATA           F   COPY public.restaurants (id, name, location, price_range) FROM stdin;
    public          postgres    false    210   �       #          0    16429    reviews 
   TABLE DATA           K   COPY public.reviews (id, restaurants_id, name, review, rating) FROM stdin;
    public          postgres    false    212   b       ,           0    0    restaurants_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.restaurants_id_seq', 17, true);
          public          postgres    false    209            -           0    0    reviews_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.reviews_id_seq', 55, true);
          public          postgres    false    211            �           2606    16417    restaurants restaurants_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.restaurants DROP CONSTRAINT restaurants_pkey;
       public            postgres    false    210            �           2606    16437    reviews reviews_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_pkey;
       public            postgres    false    212            �           2606    16438 #   reviews reviews_restaurants_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_restaurants_id_fkey FOREIGN KEY (restaurants_id) REFERENCES public.restaurants(id);
 M   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_restaurants_id_fkey;
       public          postgres    false    210    212    3217            !   �   x�-�M� D���ui�1܌BC-�
mHo/E���e�9����gM��4��3"_Lt��f!Z�jо������Ӱѩ���l�j�3��!/u%d	�P����[��[+5����$��0��|���/���:˲��� "_v�7       #   �   x�u��n�0D��W��ʖg,�%�!k�&bY�D
��})�P #���#:�=��ݮ��S�t�V�S�����l���qNiD�LW�r����}ѷK�n�d�Fe[�!�FY+�Nx�"F���#������<͵�t�xNU]�B�^%����q<v��M�"������_/�"]��Xl��g}Ӣ���6�ȎF}�(�~ V�^>     